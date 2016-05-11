/*globals qq*/
/*(function (root, factory) {
   if(typeof define === "function") {
       if(define.amd){
           define(['..','./base.api','underscore'], factory);
       }
       if(define.cmd){
           define(function(require, exports, module){
               return factory(require('./base.api'),require('underscore'));
           })
       }
   } else if(typeof module === "object" && module.exports) {
       module.exports = factory(require('./base.api'),require('underscore'));
   }
}(this, */taurus.klass(['../class','./basePublicApi','./basePrivateApi','underscore'],function(Class,basePublicApi,basePrivateApi,_) {
    "use strict";
    FineUploaderBasic = function(o) {
        var me = this;

        // These options define FineUploaderBasic mode.
        me._options = {
            debug: false,
            button: null,
            multiple: true,
            maxConnections: 3,
            disableCancelForFormUploads: false,
            autoUpload: true,

            request: {
                customHeaders: {},
                endpoint: "/server/upload",
                filenameParam: "qqfilename",
                forceMultipart: true,
                inputName: "qqfile",
                method: "POST",
                params: {},
                paramsInBody: true,
                totalFileSizeName: "qqtotalfilesize",
                uuidName: "qquuid"
            },

            validation: {
                allowedExtensions: [],
                sizeLimit: 0,
                minSizeLimit: 0,
                itemLimit: 0,
                stopOnFirstInvalidFile: true,
                acceptFiles: null,
                image: {
                    maxHeight: 0,
                    maxWidth: 0,
                    minHeight: 0,
                    minWidth: 0
                }
            },

            callbacks: {
                onSubmit: function(id, name) {},
                onSubmitted: function(id, name) {},
                onComplete: function(id, name, responseJSON, maybeXhr) {},
                onAllComplete: function(successful, failed) {},
                onCancel: function(id, name) {},
                onUpload: function(id, name) {},
                onUploadChunk: function(id, name, chunkData) {},
                onUploadChunkSuccess: function(id, chunkData, responseJSON, xhr) {},
                onResume: function(id, fileName, chunkData) {},
                onProgress: function(id, name, loaded, total) {},
                onTotalProgress: function(loaded, total) {},
                onError: function(id, name, reason, maybeXhrOrXdr) {},
                onAutoRetry: function(id, name, attemptNumber) {},
                onManualRetry: function(id, name) {},
                onValidateBatch: function(fileOrBlobData) {},
                onValidate: function(fileOrBlobData) {},
                onSubmitDelete: function(id) {},
                onDelete: function(id) {},
                onDeleteComplete: function(id, xhrOrXdr, isError) {},
                onPasteReceived: function(blob) {},
                onStatusChange: function(id, oldStatus, newStatus) {},
                onSessionRequestComplete: function(response, success, xhrOrXdr) {}
            },

            messages: {
                typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
                sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
                minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
                emptyError: "{file} is empty, please select files again without it.",
                noFilesError: "No files to upload.",
                tooManyItemsError: "Too many items ({netItems}) would be uploaded.  Item limit is {itemLimit}.",
                maxHeightImageError: "Image is too tall.",
                maxWidthImageError: "Image is too wide.",
                minHeightImageError: "Image is not tall enough.",
                minWidthImageError: "Image is not wide enough.",
                retryFailTooManyItems: "Retry failed - you have reached your file limit.",
                onLeave: "The files are being uploaded, if you leave now the upload will be canceled.",
                unsupportedBrowserIos8Safari: "Unrecoverable error - this browser does not permit file uploading of any kind due to serious bugs in iOS8 Safari.  Please use iOS8 Chrome until Apple fixes these issues."
            },

            retry: {
                enableAuto: false,
                maxAutoAttempts: 3,
                autoAttemptDelay: 5,
                preventRetryResponseProperty: "preventRetry"
            },

            classes: {
                buttonHover: "qq-upload-button-hover",
                buttonFocus: "qq-upload-button-focus"
            },

            chunking: {
                enabled: false,
                concurrent: {
                    enabled: false
                },
                mandatory: false,
                paramNames: {
                    partIndex: "qqpartindex",
                    partByteOffset: "qqpartbyteoffset",
                    chunkSize: "qqchunksize",
                    totalFileSize: "qqtotalfilesize",
                    totalParts: "qqtotalparts"
                },
                partSize: 2000000,
                // only relevant for traditional endpoints, only required when concurrent.enabled === true
                success: {
                    endpoint: null
                }
            },

            resume: {
                enabled: false,
                recordsExpireIn: 7, //days
                paramNames: {
                    resuming: "qqresume"
                }
            },

            formatFileName: function(fileOrBlobName) {
                return fileOrBlobName;
            },

            text: {
                defaultResponseError: "Upload failure reason unknown",
                fileInputTitle: "file input",
                sizeSymbols: ["kB", "MB", "GB", "TB", "PB", "EB"]
            },

            deleteFile: {
                enabled: false,
                method: "DELETE",
                endpoint: "/server/upload",
                customHeaders: {},
                params: {}
            },

            cors: {
                expected: false,
                sendCredentials: false,
                allowXdr: false
            },

            blobs: {
                defaultName: "misc_data"
            },

            paste: {
                targetElement: null,
                defaultName: "pasted_image"
            },

            camera: {
                ios: false,

                // if ios is true: button is null means target the default button, otherwise target the button specified
                button: null
            },

            // This refers to additional upload buttons to be handled by Fine Uploader.
            // Each element is an object, containing `element` as the only required
            // property.  The `element` must be a container that will ultimately
            // contain an invisible `<input type="file">` created by Fine Uploader.
            // Optional properties of each object include `multiple`, `validation`,
            // and `folders`.
            extraButtons: [],

            // Depends on the session module.  Used to query the server for an initial file list
            // during initialization and optionally after a `reset`.
            session: {
                endpoint: null,
                params: {},
                customHeaders: {},
                refreshOnReset: true
            },

            // Send parameters associated with an existing form along with the files
            form: {
                // Element ID, HTMLElement, or null
                element: "qq-form",

                // Overrides the base `autoUpload`, unless `element` is null.
                autoUpload: false,

                // true = upload files on form submission (and squelch submit event)
                interceptSubmit: true
            },

            // scale images client side, upload a new file for each scaled version
            scaling: {
                // send the original file as well
                sendOriginal: true,

                // fox orientation for scaled images
                orient: true,

                // If null, scaled image type will match reference image type.  This value will be referred to
                // for any size record that does not specific a type.
                defaultType: null,

                defaultQuality: 80,

                failureText: "Failed to scale",

                includeExif: false,

                // metadata about each requested scaled version
                sizes: []
            },

            workarounds: {
                iosEmptyVideos: true,
                ios8SafariUploads: true,
                ios8BrowserCrash: false
            }
        };

        // Replace any default options with user defined ones
        _.extend(me._options, o, true);

        me._buttons = [];
        me._extraButtonSpecs = {};
        me._buttonIdsForFileIds = [];

        me._wrapCallbacks();
        //me._disposeSupport =  new qq.DisposeSupport();

        me._storedIds = [];
        me._autoRetries = [];
        me._retryTimeouts = [];
        me._preventRetries = [];
        me._thumbnailUrls = [];

        me._netUploadedOrQueued = 0;
        me._netUploaded = 0;
        me._uploadData = me._createUploadDataTracker();

        me._initFormSupportAndParams();

        me._customHeadersStore = me._createStore(me._options.request.customHeaders);
        me._deleteFileCustomHeadersStore = me._createStore(me._options.deleteFile.customHeaders);

        me._deleteFileParamsStore = me._createStore(me._options.deleteFile.params);

        me._endpointStore = me._createStore(me._options.request.endpoint);
        me._deleteFileEndpointStore = me._createStore(me._options.deleteFile.endpoint);

        me._handler = me._createUploadHandler();

        me._deleteHandler = qq.DeleteFileAjaxRequester && me._createDeleteHandler();

        if (me._options.button) {
            me._defaultButtonId = me._createUploadButton({
                element: me._options.button,
                title: me._options.text.fileInputTitle
            }).getButtonId();
        }

        me._generateExtraButtonSpecs();

        me._handleCameraAccess();

        if (me._options.paste.targetElement) {
            if (qq.PasteSupport) {
                me._pasteHandler = me._createPasteHandler();
            }
            else {
                me.log("Paste support module not found", "error");
            }
        }

        me._preventLeaveInProgress();

        me._imageGenerator = qq.ImageGenerator && new qq.ImageGenerator(qq.bind(me.log, me));
        me._refreshSessionData();

        me._succeededSinceLastAllComplete = [];
        me._failedSinceLastAllComplete = [];

        me._scaler = (qq.Scaler && new qq.Scaler(me._options.scaling, qq.bind(me.log, me))) || {};
        if (me._scaler.enabled) {
            me._customNewFileHandler = qq.bind(me._scaler.handleNewFile, me._scaler);
        }

        if (qq.TotalProgress && qq.supportedFeatures.progressBar) {
            me._totalProgress = new qq.TotalProgress(
                qq.bind(me._onTotalProgress, me),

                function(id) {
                    var entry = me._uploadData.retrieve({id: id});
                    return (entry && entry.size) || 0;
                }
            );
        }

        me._currentItemLimit = me._options.validation.itemLimit;
    };
    return Class.extend({
        init:FineUploaderBasic
    }).extend(basePublicApi).extend(basePrivateApi)
});
