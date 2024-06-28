'use client'
import ContactForm from './ContactForm'

const GetInTouch = ({ setPopup }) => {
  return (
    <div className="overlay mt-4">
      <div className="modal">
        <ContactForm isAddStyle={true} showCloseButton={true} setPopup={setPopup} />
      </div>
    </div>
  )
}

export default GetInTouch
