/**
 * @author nttdocomo
 */
define(function(require) {
	(function crossDomainPost() {
		// Add the iframe with a unique name
		var iframe = document.createElement("iframe");
		var uniqueString = "guohead_mix_vote_2014";
		document.body.appendChild(iframe);
		//iframe.style.display = "none";
		iframe.contentWindow.name = uniqueString;
		iframe.alert = function(msg){
            console.log(msg)
        };

		// construct a form with hidden inputs, targeting the iframe
		var form = document.createElement("form");
		form.target = uniqueString;
		form.action = "http://www.fistchina.com/excludes/do.jsp";
		form.method = "POST";

		// repeat for each parameter
		var inputNames = ['group', 'id', 'code', 'upVali'];
		var inputValues = ['11', '20284', '243408', parseInt(Math.random() * 10)];
		for (var i = 0; i < inputNames.length; i++) {
			var input = document.createElement("input");
			input.type = "hidden";
			input.name = inputNames[i];
			input.value = inputValues[i];
			form.appendChild(input);
		}

		document.body.appendChild(form);
		form.submit();
	})();
});
