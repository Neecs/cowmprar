import Button from "react-bootstrap/Button";

const WhatsappButton = ({sellerPhoneNumber}) => {
    const sendWhatsappMessage = () => {
        const whatsAppURL = `https://wa.me/+57${sellerPhoneNumber}`;

        window.open(whatsAppURL, '_blank');
    }
    return (
        <Button onClick={sendWhatsappMessage}>
            Write me in WhatsApp
        </Button>
    );
}

export default WhatsappButton;