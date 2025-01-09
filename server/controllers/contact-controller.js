const Contact = require('../models/contact-model');
const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        await Contact.create(response);
        return res.status(200).json({ message: "Your message has been sent successfully" });
    }
    catch (error) {
        return res.status(400).json({ message: "message not sent" });
    }
};
module.exports = contactForm;