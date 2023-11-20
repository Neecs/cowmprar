import Button from "react-bootstrap/Button";

const EmailButton = ({sellerEmail}) => {
    const sendEmail = () => {
        const emailSubject = 'Regarding your product';  // Optional: Set a default subject
        const emailBody = 'Hi, I am interested in your product. ...';  // Optional: Set a default email body

        const mailtoURL = `mailto:${sellerEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        window.location.href = mailtoURL;
    }
    return (
        <Button onClick={sendEmail}>
            Contacto via Email
        </Button>
    );
}

export default EmailButton;