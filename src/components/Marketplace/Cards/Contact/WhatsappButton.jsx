/**
 * React component representing a button to write a WhatsApp message to the seller.
 *
 * @component
 * @param {Object} props - The properties of the WhatsappButton component.
 * @param {string} props.sellerPhoneNumber - The phone number of the seller (including the country code).
 * @returns {JSX.Element} JSX representation of the WhatsappButton component.
 */
import Button from "react-bootstrap/Button";

/**
 * @function
 * @description Functional component representing a button to write a WhatsApp message to the seller.
 * @param {Object} props - The properties of the WhatsappButton component.
 * @param {string} props.sellerPhoneNumber - The phone number of the seller (including the country code).
 * @returns {JSX.Element} JSX representation of the WhatsappButton component.
 */
const WhatsappButton = ({ sellerPhoneNumber }) => {
  /**
   * @function
   * @description Opens WhatsApp in a new tab with a pre-filled message to the seller.
   */
  const sendWhatsappMessage = () => {
    // Construct the WhatsApp URL
    const whatsAppURL = `https://wa.me/${sellerPhoneNumber}`;

    // Open WhatsApp in a new tab with the pre-filled message
    window.open(whatsAppURL, '_blank');
  };

  // JSX representation of the WhatsappButton component
  return (
    <Button onClick={sendWhatsappMessage}>
      Write me in WhatsApp
    </Button>
  );
};

export default WhatsappButton;
