/**
 * @author nttdocomo
 */
define(function(require) {
	var Trigger = require('./trigger');
	require('../../fileuploader');
	/*==*/
	var supportsUploading = qq.supportedFeatures.uploading, supportsAjaxFileUploading = qq.supportedFeatures.ajaxUploading;
	taurus.augmentObject('$.support', {
		ajaxUploading : supportsAjaxFileUploading
	});
	return taurus.view('taurus.form.field.File', Trigger.extend({
		buttonText : 'Browse...',
		childEls : {
			'fileInputEl' : '#fileInputEl',
			'inputEl' : '.form-control',
			'buttonEl' : '#buttonEl',
			'spinnerEl' : '.spinner',
			'cancelEl' : '.qq-upload-cancel'
		},
		events : {
			'change #fileInputEl' : 'onFileChange',
			'click .qq-upload-cancel' : 'cancel'
		},
		cancelButtonText : 'cancel',
		/*options*/
		chunking : {
			enabled : false,
			partSize : 2000000,
			paramNames : {
				partIndex : 'qqpartindex',
				partByteOffset : 'qqpartbyteoffset',
				chunkSize : 'qqchunksize',
				totalFileSize : 'qqtotalfilesize',
				totalParts : 'qqtotalparts'
			}
		},
        resume: {
            enabled: false,
            id: null,
            cookiesExpireIn: 7, //days
            paramNames: {
                resuming: "qqresume"
            }
        },
        cors: {
            expected: false,
            sendCredentials: false,
            allowXdr: false
        },
		debug : false,
		deleteFile : {
			forceConfirm : false,
			confirmMessage : "Are you sure you want to delete {filename}?",
			deletingStatusText : "Deleting...",
			deletingFailedText : "Delete failed"

		},
		button : null,
		multiple : true,
		maxConnections : 3,
		disableCancelForFormUploads : false,
		autoUpload : true,
		/*request : {
		 endpoint : '/server/upload',
		 params : {},
		 paramsInBody : true,
		 customHeaders : {},
		 forceMultipart : true,
		 inputName : 'qqfile',
		 uuidName : 'qquuid',
		 totalFileSizeName : 'qqtotalfilesize',
		 filenameParam : 'qqfilename'
		 },*/
		editFilename : {
			enabled : false
		},
		retry : {
			enableAuto : false,
			maxAutoAttempts : 3,
			autoAttemptDelay : 5,
			preventRetryResponseProperty : 'preventRetry'
		},
		text : {
			defaultResponseError : "Upload failure reason unknown",
			sizeSymbols : ['kB', 'MB', 'GB', 'TB', 'PB', 'EB']
		},
		validation : {
			allowedExtensions : [],
			sizeLimit : 0,
			minSizeLimit : 0,
			itemLimit : 0,
			stopOnFirstInvalidFile : true,
			acceptFiles : null
		},
		_filesInProgress : [],
		_netUploadedOrQueued : 0,
		_retryTimeouts : [],
		_storedIds : [],
		initialize : function(options) {
			options.request = $.extend({
				endpoint : '/server/upload',
				params : {},
				paramsInBody : true,
				customHeaders : {},
				forceMultipart : true,
				inputName : 'qqfile',
				uuidName : 'qquuid',
				totalFileSizeName : 'qqtotalfilesize',
				filenameParam : 'qqfilename'
			}, options.request);
			Trigger.prototype.initialize.apply(this, [options]);
			this._endpointStore = this._createEndpointStore("request");
			this._paramsStore = this._createParamsStore("request");
			this._handler = this._createUploadHandler();
			this._uploadData = this._createUploadDataTracker();
			this._deleteRetryOrCancelClickHandler = this._bindDeleteRetryOrCancelClickEvent();
		},
		addFiles : function(filesOrInputs, params, endpoint) {
			var self = this, verifiedFilesOrInputs = [], fileOrInputIndex, fileOrInput, fileIndex;

			if (filesOrInputs) {
				if (!qq.isFileList(filesOrInputs)) {
					filesOrInputs = [].concat(filesOrInputs);
				}

				for ( fileOrInputIndex = 0; fileOrInputIndex < filesOrInputs.length; fileOrInputIndex += 1) {
					fileOrInput = filesOrInputs[fileOrInputIndex];

					if (qq.isFileOrInput(fileOrInput)) {
						if (qq.isInput(fileOrInput) && $.support.ajaxUploading) {
							for ( fileIndex = 0; fileIndex < fileOrInput.files.length; fileIndex++) {
								verifiedFilesOrInputs.push(fileOrInput.files[fileIndex]);
							}
						} else {
							verifiedFilesOrInputs.push(fileOrInput);
						}
					} else {
						self.log(fileOrInput + ' is not a File or INPUT element!  Ignoring!', 'warn');
					}
				}
				//this.log('Received ' + verifiedFilesOrInputs.length + ' files or inputs.');
				this._prepareItemsForUpload(verifiedFilesOrInputs, params, endpoint);
			}
		},
		cancel : function(e) {
			this._handler.cancel(parseInt($(e.target).attr('data-item-id')));
			return false;
		},
		/**
		 * Gets the markup to be inserted into the subTplMarkup.
		 */
		getTriggerMarkup : function() {
			return _.template((this.buttonOnly ? '' : '<span id="<%=id%>" class="input-group-btn <%=cls%>">') + '<div id="buttonEl" class="btn btn-primary' + (this.buttonOnly ? ' <%=cls%>' : '') + '" <%if(disabled){%> disabled="disabled"<%}%>><%=text%>' + $('<div>').append($('<input />', {
				id : 'fileInputEl',
				class : taurus.baseCSSPrefix + 'form-file-input',
				type : 'file',
				disabled : this.disabled,
				size : 1
			})).html() + '</div>' + (this.buttonOnly ? '' : '</span>'), {
				id : 'buttonEl',
				cls : taurus.baseCSSPrefix + 'form-file-btn',
				text : this.buttonText,
				disabled : this.disabled
			});
		},
		getUuid : function(id) {
			return this._handler.getUuid(id);
		},
		getSize : function(id) {
			return this._handler.getSize(id);
		},
		getFileName : function(id) {
			return this._handler.getName(id);
		},
		log : qq.log,
		onFileChange : function(e) {
			var input = e.target;
			if ($.support.ajaxUploading) {
				this.addFiles(input.files);
			} else {
				this.addFiles(input);
			}
			Trigger.prototype.checkChange.call(this);
			//this._button.reset();
		},
		onDisable : function() {
			this.fileInputEl.attr('disabled', true);
			this.buttonEl.attr('disabled', true);
		},
		onEnable : function() {
			this.fileInputEl.attr('disabled', false);
			this.buttonEl.attr('disabled', false);
		},
		onCancel : taurus.emptyFn,
		onComplete : taurus.emptyFn,
		onError : taurus.emptyFn,
		onProgress : taurus.emptyFn,
		onValidateBatch : taurus.emptyFn,
		onValidate : taurus.emptyFn,
		onStatusChange : taurus.emptyFn,
		onSubmit : taurus.emptyFn,
		onUpload : taurus.emptyFn,
		onSubmitted : taurus.emptyFn,
		_addToList : function(id, name) {
			this.bodyEl.parent().find('.help-block').remove();
			var item = this.bodyEl.append(_.template(['<p class="text-info help-block" id="<%=fileId%>">', '<span class="halflings refresh spinner" data-name="refresh" data-type="" data-prefix="halflings" data-utf="E031"></span>', '<span class="qq-upload-file"><%=name%></span>' + (this.disableCancelForFormUploads && !qq.supportedFeatures.ajaxUploading ? '<a class="qq-upload-cancel" href="#" data-item-id="' + id + '"><%=cancelButtonText%></a>' : ''), '<span class="qq-upload-status-text"></span></p>'].join(''), {
				'name' : name,
				'cancelButtonText' : this.cancelButtonText,
				'fileId' : 'file-' + id
			}));
			/*if (this.disableCancelForFormUploads && !qq.supportedFeatures.ajaxUploading) {
			 var cancelLink = this._find(item, 'cancel');
			 qq(cancelLink).remove();
			 }

			 item.qqFileId = id;

			 var fileElement = this._find(item, 'file');
			 qq(fileElement).setText(this._options.formatFileName(name));
			 qq(this._find(item, 'size')).hide();
			 if (!this._options.multiple) {
			 this._handler.cancelAll();
			 this._clearList();
			 }

			 if (this._options.display.prependFiles) {
			 this._prependItem(item);
			 } else {
			 this._listElement.appendChild(item);
			 }
			 this._filesInBatchAddedToUi += 1;

			 if (this._options.display.fileSizeOnSubmit && qq.supportedFeatures.ajaxUploading) {
			 this._displayFileSize(id);
			 }*/
		},
		_bindDeleteRetryOrCancelClickEvent : function() {
			var self = this;

			return new qq.DeleteRetryOrCancelClickHandler({
				listElement : this._listElement,
				classes : this._classes,
				log : function(message, lvl) {
					self.log(message, lvl);
				},
				onDeleteFile : function(fileId) {
					self.deleteFile(fileId);
				},
				onCancel : function(fileId) {
					self.cancel(fileId);
				},
				onRetry : function(fileId) {
					var item = self.getItemByFileId(fileId);

					qq(item).removeClass(self._classes.retryable);
					self.retry(fileId);
				},
				onGetName : function(fileId) {
					return self.getName(fileId);
				}
			});
		},
		_createEndpointStore : function(type) {
			var endpointStore = {}, self = this;

			return {
				setEndpoint : function(endpoint, id) {
					endpointStore[id] = endpoint;
				},

				getEndpoint : function(id) {
					/*jshint eqeqeq: true, eqnull: true*/
					if (id != null && endpointStore[id]) {
						return endpointStore[id];
					}

					return self[type].endpoint;
				},

				remove : function(fileId) {
					return
					delete endpointStore[fileId];
				},

				reset : function() {
					endpointStore = {};
				}
			};
		},
		_createParamsStore : function(type) {
			var paramsStore = {}, self = this;

			return {
				setParams : function(params, id) {
					var paramsCopy = {};
					$.extend(paramsCopy, params);
					paramsStore[id] = paramsCopy;
				},

				getParams : function(id) {
					/*jshint eqeqeq: true, eqnull: true*/
					var paramsCopy = {};

					if (id != null && paramsStore[id]) {
						$.extend(paramsCopy, paramsStore[id]);
					} else {
						$.extend(paramsCopy, self[type].params);
					}

					return paramsCopy;
				},

				remove : function(fileId) {
					return
					delete paramsStore[fileId];
				},

				reset : function() {
					paramsStore = {};
				}
			};
		},
		_createUploadDataTracker : function() {
			var self = this;

			return new qq.UploadData({
				getName : function(id) {
					return self.getFileName(id);
				},
				getUuid : function(id) {
					return self.getUuid(id);
				},
				getSize : function(id) {
					return self.getSize(id);
				},
				onStatusChange : function(id, oldStatus, newStatus) {
					self._onUploadStatusChange(id, oldStatus, newStatus);
					self.onStatusChange(id, oldStatus, newStatus);
				}
			});
		},
		_createUploadHandler : function() {
			var self = this;

			return new qq.UploadHandler({
				debug : this.debug,
				forceMultipart : this.request.forceMultipart,
				maxConnections : this.maxConnections,
				customHeaders : this.request.customHeaders,
				inputName : this.request.inputName,
				uuidParamName : this.request.uuidName,
				filenameParam : this.request.filenameParam,
				totalFileSizeParamName : this.request.totalFileSizeName,
				cors : this.cors,
				demoMode : this.demoMode,
				paramsInBody : this.request.paramsInBody,
				paramsStore : this._paramsStore,
				endpointStore : this._endpointStore,
				chunking : this.chunking,
				resume : this.resume,
				blobs : this.blobs,
				log : function(str, level) {
					self.log(str, level);
				},
				onProgress : function(id, name, loaded, total) {
					self._onProgress(id, name, loaded, total);
					self.onProgress(id, name, loaded, total);
				},
				onComplete : function(id, name, result, xhr) {
					self._onComplete(id, name, result, xhr);
					self.onComplete(id, name, result, xhr);
				},
				onCancel : function(id, name) {
					return self._handleCheckedCallback({
						name : "onCancel",
						callback : qq.bind(self.onCancel, self, id, name),
						onSuccess : qq.bind(self._onCancel, self, id, name),
						identifier : id
					});
				},
				onUpload : function(id, name) {
					self._onUpload(id, name);
					self.onUpload(id, name);
				},
				onUploadChunk : function(id, name, chunkData) {
					self._options.callbacks.onUploadChunk(id, name, chunkData);
				},
				onResume : function(id, name, chunkData) {
					return self._options.callbacks.onResume(id, name, chunkData);
				},
				onAutoRetry : function(id, name, responseJSON, xhr) {
					/*self._preventRetries[id] = responseJSON[self.retry.preventRetryResponseProperty];

					 if (self._shouldAutoRetry(id, name, responseJSON)) {
					 self._maybeParseAndSendUploadError(id, name, responseJSON, xhr);
					 self._options.callbacks.onAutoRetry(id, name, self._autoRetries[id] + 1);
					 self._onBeforeAutoRetry(id, name);

					 self._retryTimeouts[id] = setTimeout(function() {
					 self._onAutoRetry(id, name, responseJSON)
					 }, self._options.retry.autoAttemptDelay * 1000);

					 return true;
					 } else {*/
					return false;
					//}
				},
				onUuidChanged : function(id, newUuid) {
					self._uploadData.uuidChanged(id, newUuid);
				}
			});
		},
		_fileOrBlobRejected : function(id, name) {
			if (id !== undefined) {
				this._uploadData.setStatus(id, qq.status.REJECTED);
			}
		},
		_getValidationDescriptor : function(fileOrBlobData) {
			var name, size, fileDescriptor;

			fileDescriptor = {};
			name = this._parseFileOrBlobDataName(fileOrBlobData);
			size = this._parseFileOrBlobDataSize(fileOrBlobData);

			fileDescriptor.name = name;
			if (size !== undefined) {
				fileDescriptor.size = size;
			}

			return fileDescriptor;
		},
		_getValidationDescriptors : function(files) {
			var self = this, fileDescriptors = [];

			$.each(files, function(idx, file) {
				fileDescriptors.push(self._getValidationDescriptor(file));
			});

			return fileDescriptors;
		},
		_handleCheckedCallback : function(details) {
			var self = this, callbackRetVal = details.callback();

			if (callbackRetVal !== false) {
				details.onSuccess(callbackRetVal);
			} else {
				if (details.onFailure) {
					this.log(details.name + " - return value was 'false' for " + details.identifier + ".  Invoking failure callback.");
					details.onFailure();
				} else {
					this.log(details.name + " - return value was 'false' for " + details.identifier + ".  Will not proceed.");
				}
			}

			return callbackRetVal;
		},
		_isAllowedExtension : function(fileName) {
			var allowed = this.validation.allowedExtensions, valid = false;

			if (!allowed.length) {
				return true;
			}

			$.each(allowed, function(idx, allowedExt) {
				/**
				 * If an argument is not a string, ignore it.  Added when a possible issue with MooTools hijacking the
				 * `allowedExtensions` array was discovered.  See case #735 in the issue tracker for more details.
				 */
				if (_.isString(allowedExt)) {
					/*jshint eqeqeq: true, eqnull: true*/
					var extRegex = new RegExp('\\.' + allowedExt + "$", 'i');

					if (fileName.match(extRegex) != null) {
						valid = true;
						return false;
					}
				}
			});

			return valid;
		},
		_isDeletePossible : function() {
			return false;
			/*if (!this.deleteFile.enabled) {
			 return false;
			 }

			 if (this._options.cors.expected) {
			 if (qq.supportedFeatures.deleteFileCorsXhr) {
			 return true;
			 }

			 if (qq.supportedFeatures.deleteFileCorsXdr && this._options.cors.allowXdr) {
			 return true;
			 }

			 return false;
			 }

			 return true;*/
		},
		_isEditFilenameEnabled : function() {
			return this.editFilename.enabled && !this.autoUpload;
		},
		_maybeParseAndSendUploadError : function(id, name, response, xhr) {
			//assuming no one will actually set the response code to something other than 200 and still set 'success' to true
			if (!response.success) {
				if (xhr && xhr.status !== 200 && !response.error) {
					this.onError(id, name, "XHR returned response code " + xhr.status, xhr);
				} else {
					var errorReason = response.error ? response.error : this._options.text.defaultResponseError;
					this.onError(id, name, errorReason, xhr);
				}
			}
		},
		_maybeProcessNextItemAfterOnValidateCallback : qq.FineUploader.prototype._maybeProcessNextItemAfterOnValidateCallback,
		_onCancel : function(id, name) {
			this._netUploadedOrQueued--;

			this._removeFromFilesInProgress(id);

			clearTimeout(this._retryTimeouts[id]);

			var storedItemIndex = qq.indexOf(this._storedIds, id);
			if (!this.autoUpload && storedItemIndex >= 0) {
				this._storedIds.splice(storedItemIndex, 1);
			}

			this._uploadData.setStatus(id, qq.status.CANCELED);
			this._removeFileItem(id);
		},
		_onComplete : function(id, name, result, xhr) {
			if (!result.success) {
				this._netUploadedOrQueued--;
				this._uploadData.setStatus(id, qq.status.UPLOAD_FAILED);
			} else {
				this._netUploaded++;
				this._uploadData.setStatus(id, qq.status.UPLOAD_SUCCESSFUL);
			}

			this._removeFromFilesInProgress(id);
			this._maybeParseAndSendUploadError(id, name, result, xhr);
			//qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments);var item = this.getItemByFileId(id);
			var item = this.$el.find('#file-' + id);
			//qq(this._find(item, 'statusText')).clearText();

			//qq(item).removeClass(this._classes.retrying);
			//qq(this._find(item, 'progressBar')).hide();

			if (!this.disableCancelForFormUploads || qq.supportedFeatures.ajaxUploading) {
				//qq(this._find(item, 'cancel')).hide();
				item.find('.qq-upload-cancel').addClass('hide');
			}
			//qq(this._find(item, 'spinner')).hide();
			item.find('.spinner').addClass('hide');

			if (result.success) {
				if (this._isDeletePossible()) {
					this._showDeleteLink(id);
				}
				item.attr('class', 'text-success help-block');
				/*if (this._classes.successIcon) {
				 this._find(item, 'finished').style.display = "inline-block";
				 qq(item).addClass(this._classes.successIcon);
				 }*/
			} else {
				item.attr('class', 'text-warning help-block');
				item.find('.qq-upload-status-text').text(result.error);
				/*qq(item).addClass(this._classes.fail);
				 if (this._classes.failIcon) {
				 this._find(item, 'finished').style.display = "inline-block";
				 qq(item).addClass(this._classes.failIcon);
				 }
				 if (this._options.retry.showButton && !this._preventRetries[id]) {
				 qq(item).addClass(this._classes.retryable);
				 }
				 this._controlFailureTextDisplay(item, result);*/
			}
		},
		_onProgress : function(id, name, loaded, total) {
		},
		_onSubmit : function(id, name) {
			this._netUploadedOrQueued++;

			if (this.autoUpload) {
				this._filesInProgress.push(id);
			}
			this._addToList(id, name);
		},
		// The file item has been added to the DOM.
		_onSubmitted : function(id) {
			// If the edit filename feature is enabled, mark the filename element as "editable" and the associated edit icon
			/*var item = this.getItemByFileId(id), qqFilenameDisplay = qq(this._find(item, 'file')), qqEditFilenameIcon, qqEditFilenameIcon;
			 if (this._isEditFilenameEnabled()) {
			 qqEditFilenameIcon = qq(this._find(item, 'editNameIcon')), editableClass = this._classes.editable;

			 qqFilenameDisplay.addClass(editableClass);
			 qqEditFilenameIcon.addClass(editableClass);

			 // If the focusin event is not supported, we must add a focus handler to the newly create edit filename text input
			 if (!this._focusinEventSupported) {
			 this._filenameInputFocusHandler.addHandler(this._find(item, 'editFilenameInput'));
			 }
			 }*/
		},
		_onSubmitCallbackSuccess : function(id, name) {
			this._uploadData.setStatus(id, qq.status.SUBMITTED);

			this._onSubmit.apply(this, arguments);
			this._onSubmitted.apply(this, arguments);
			this.onSubmitted.apply(this, arguments);

			if (this.autoUpload) {
				if (!this._handler.upload(id)) {
					this._uploadData.setStatus(id, qq.status.QUEUED);
				}
			} else {
				this._storeForLater(id);
			}
		},
		_onUpload : function(id, name) {
			this._showSpinner(id);
		},
		_onUploadStatusChange : function(id, oldStatus, newStatus) {
			if (this._isEditFilenameEnabled()) {
				var item = this.getItemByFileId(id), editableClass = this._classes.editable, qqFilenameDisplay, qqEditFilenameIcon;

				// Status for a file exists before it has been added to the DOM, so we must be careful here.
				if (item && newStatus !== qq.status.SUBMITTED) {
					qqFilenameDisplay = qq(this._find(item, 'file'));
					qqEditFilenameIcon = qq(this._find(item, 'editNameIcon'));

					qqFilenameDisplay.removeClass(editableClass);
					qqEditFilenameIcon.removeClass(editableClass);
				}
			}
		},
		_onValidateBatchCallbackSuccess : function(validationDescriptors, items, params, endpoint) {
			var errorMessage, itemLimit = this.validation.itemLimit, proposedNetFilesUploadedOrQueued = this._netUploadedOrQueued + validationDescriptors.length;

			if (itemLimit === 0 || proposedNetFilesUploadedOrQueued <= itemLimit) {
				if (items.length > 0) {
					this._handleCheckedCallback({
						name : "onValidate",
						callback : _.bind(this.onValidate, this, items[0]),
						onSuccess : _.bind(this._onValidateCallbackSuccess, this, items, 0, params, endpoint),
						onFailure : _.bind(this._onValidateCallbackFailure, this, items, 0, params, endpoint),
						identifier : "Item '" + items[0].name + "', size: " + items[0].size
					});
				} else {
					this._itemError("noFilesError");
				}
			} else {
				errorMessage = this._options.messages.tooManyItemsError.replace(/\{netItems\}/g, proposedNetFilesUploadedOrQueued).replace(/\{itemLimit\}/g, itemLimit);
				this._batchError(errorMessage);
			}
		},
		_onValidateCallbackSuccess : function(items, index, params, endpoint) {
			var nextIndex = index + 1, validationDescriptor = this._getValidationDescriptor(items[index]), validItem = false;

			if (this._validateFileOrBlobData(items[index], validationDescriptor)) {
				validItem = true;
				this._upload(items[index], params, endpoint);
			}

			this._maybeProcessNextItemAfterOnValidateCallback(validItem, items, nextIndex, params, endpoint);
		},
		_onValidateCallbackFailure : function(items, index, params, endpoint) {
			var nextIndex = index + 1;

			this._fileOrBlobRejected(undefined, items[0].name);

			this._maybeProcessNextItemAfterOnValidateCallback(false, items, nextIndex, params, endpoint);
		},
		_parseFileOrBlobDataName : function(fileOrBlobData) {
			var name;

			if (qq.isFileOrInput(fileOrBlobData)) {
				if (fileOrBlobData.value) {
					// it is a file input
					// get input value and remove path to normalize
					name = fileOrBlobData.value.replace(/.*(\/|\\)/, "");
				} else {
					// fix missing properties in Safari 4 and firefox 11.0a2
					name = (fileOrBlobData.fileName !== null && fileOrBlobData.fileName !== undefined) ? fileOrBlobData.fileName : fileOrBlobData.name;
				}
			} else {
				name = fileOrBlobData.name;
			}

			return name;
		},
		_parseFileOrBlobDataSize : function(fileOrBlobData) {
			var size;

			if (qq.isFileOrInput(fileOrBlobData)) {
				if (!fileOrBlobData.value) {
					// fix missing properties in Safari 4 and firefox 11.0a2
					size = (fileOrBlobData.fileSize !== null && fileOrBlobData.fileSize !== undefined) ? fileOrBlobData.fileSize : fileOrBlobData.size;
				}
			} else {
				size = fileOrBlobData.blob.size;
			}

			return size;
		},
		_prepareItemsForUpload : function(items, params, endpoint) {
			var validationDescriptors = this._getValidationDescriptors(items);

			this._handleCheckedCallback({
				name : "onValidateBatch",
				callback : _.bind(this.onValidateBatch, this, validationDescriptors),
				onSuccess : _.bind(this._onValidateBatchCallbackSuccess, this, validationDescriptors, items, params, endpoint),
				identifier : "batch validation"
			});
		},
		_removeFileItem : function(id) {
			this.$el.find('#file-' + id).remove();
		},
		_removeFromFilesInProgress : function(id) {
			var index = _.indexOf(this._filesInProgress, id);
			if (index >= 0) {
				this._filesInProgress.splice(index, 1);
			}
		},
		_showSpinner : function(id) {
			this.spinnerEl.removeClass('hide');
		},
		_storeForLater : function(id) {
			this._storedIds.push(id);
			//var item = this.getItemByFileId(id);
			//qq(this._find(item, 'spinner')).hide();
		},
		_upload : function(blobOrFileContainer, params, endpoint) {
			var id = this._handler.add(blobOrFileContainer), name = this._handler.getName(id);

			this._uploadData.added(id);

			if (params) {
				this.setParams(params, id);
			}

			if (endpoint) {
				this.setEndpoint(endpoint, id);
			}

			this._handleCheckedCallback({
				name : "onSubmit",
				callback : _.bind(this.onSubmit, this, id, name),
				onSuccess : _.bind(this._onSubmitCallbackSuccess, this, id, name),
				onFailure : _.bind(this._fileOrBlobRejected, this, id, name),
				identifier : id
			});
		},
		_validateFileOrBlobData : function(item, validationDescriptor) {
			var name = validationDescriptor.name, size = validationDescriptor.size, valid = true;

			if (this.onValidate(validationDescriptor) === false) {
				valid = false;
			}
			if (qq.isFileOrInput(item) && !this._isAllowedExtension(name)) {
				this._itemError('typeError', name);
				valid = false;

			} else if (size === 0) {
				this._itemError('emptyError', name);
				valid = false;

			} else if (size && this.validation.sizeLimit && size > this.validation.sizeLimit) {
				this._itemError('sizeError', name);
				valid = false;

			} else if (size && size < this.validation.minSizeLimit) {
				this._itemError('minSizeError', name);
				valid = false;
			}

			if (!valid) {
				this._fileOrBlobRejected(undefined, name);
			}

			return valid;
		}
	}));
});
