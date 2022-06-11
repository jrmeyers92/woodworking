if (document.getElementById('contactModal')){
    const contactModal = document.getElementById('contactModal');
    const contactModalToggleButton = document.getElementById('contactModalToggleButton');

    function toggleContactModal(event) {
        event.preventDefault();
        if (contactModal.isOpen) {
            contactModal.close();
        } else {
            contactModal.open();
        }
    }

    contactModalToggleButton.addEventListener('click', toggleContactModal, false);

}

