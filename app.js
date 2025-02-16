// Updated version - test change
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const guestsGroup = document.getElementById('guestsGroup');
    const message = document.getElementById('message');

    // Handle attendance radio button changes
    document.querySelectorAll('input[name="attending"]').forEach(radio => {
        radio.addEventListener('change', function() {
            guestsGroup.style.display = this.value === 'Yes' ? 'block' : 'none';
            if (this.value === 'No') {
                document.getElementById('numberOfGuests').value = '0';
            }
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const surname = document.getElementById('surname').value;
        const attending = document.querySelector('input[name="attending"]:checked').value;
        const numberOfGuests = attending === 'Yes' ? 
            document.getElementById('numberOfGuests').value : '0';

        // Prepare the data
        const formData = {
            firstName,
            surname,
            attending,
            numberOfGuests
        };

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwRAB0DhKi4bU3GXZAIj9tzNb7kYpdLUyyHbE5fIpR1-iysbNq7nI9fXJPf-NAiSDPa/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Show success message
            message.textContent = attending === 'Yes' 
                ? 'Thank you for confirming your attendance!' 
                : 'We are sorry you cannot make it.';
            message.className = 'message success';

            // Reset form
            form.reset();
            guestsGroup.style.display = 'none';

        } catch (error) {
            console.error('Error:', error);
            message.textContent = 'There was an error submitting your RSVP. Please try again.';
            message.className = 'message error';
        }
    });
}); 