const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(sails.config.sendgrid.api_key);
// sendgrid.setSubstitutionWrappers('%', '%'); // Configure the substitution tag wrappers globally



module.exports = {
	sendMail: function(payload, callback) {
		const msg = {
		to: payload.to,
			from: {
				name: payload.from&&payload.from.name?payload.from.name: sails.config.sendgrid.from.name,
				email: payload.from&&payload.from.email?payload.from.email: sails.config.sendgrid.from.email,
			},
			subject: payload.subject || "Hello",
			html: payload.html,
			text: payload.text,
			templateId: payload.templateId,
			dynamic_template_data: payload.dynamic_template_data
		};
		if (typeof (payload.attachments != "undefined")) msg.attachments = payload.attachments;
		sendgrid.send(msg, callback);
	}
}
