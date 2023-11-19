/**
 * React component representing a button to write an email to the seller.
 *
 * @component
 * @param {Object} props - The properties of the EmailButton component.
 * @param {string} props.sellerEmail - The email address of the seller.
 * @returns {JSX.Element} JSX representation of the EmailButton component.
 */
import Button from "react-bootstrap/Button";

/**
 * @function
 * @description Functional component representing a button to write an email to the seller.
 * @param {Object} props - The properties of the EmailButton component.
 * @param {string} props.sellerEmail - The email address of the seller.
 * @returns {JSX.Element} JSX representation of the EmailButton component.
 */
const EmailButton = ({ sellerEmail }) => {
  /**
   * @function
   * @description Opens the default email client with a pre-filled email to the seller.
   */
  const sendEmail = () => {
    const emailSubject = 'Regarding your product'; // Optional: Set a default subject
    const emailBody = 'Hi, I am interested in your product. ...'; // Optional: Set a default email body

    // Construct the mailto URL
    const mailtoURL = `mailto:${sellerEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Open the default email client with the pre-filled email
    window.location.href = mailtoURL;
  };

  // JSX representation of the EmailButton component
  return (
    <Button onClick={sendEmail}>
      Write me via Email
    </Button>
  );
};

export default EmailButton;
