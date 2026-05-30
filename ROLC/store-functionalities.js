
//frequently asked buttons
document.addEventListener("DOMContentLoaded", function() {
    const faqButtons = document.querySelectorAll(".faq-btn");
    faqButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const answer = btn.nextElementSibling;
            const span = btn.querySelector("span");

            //toggle visibility of the answer
            if (answer.style.display === "block") {
                answer.style.display = "none";
                span.textContent = "+";
            } else {
                answer.style.display = "block";
                span.textContent = "–";
            }
        });
    });

    //handle product options based on product type
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const sizeSelect = card.querySelector('select[name="size"]');
        const quantitySelect = card.querySelector('select[name="quantity"]');
        
        //if product has sizes
        if (sizeSelect) {
            const sizesData = JSON.parse(sizeSelect.getAttribute('data-sizes') || '{}');
            
            sizeSelect.addEventListener('change', (event) => {
                const selectedSize = event.target.value;
                quantitySelect.innerHTML = '<option value="">SELECT QUANTITY</option>';
                
                if (selectedSize && selectedSize !== '') {
                    const maxQty = sizesData[selectedSize] || 0;
                    
                    if (maxQty > 0) {
                        const availableQty = Math.min(maxQty, 10);
                        for (let q = 1; q <= availableQty; q++) {
                            quantitySelect.innerHTML += `<option value="${q}">${q}</option>`;
                        }
                        quantitySelect.disabled = false;
                    } else {
                        quantitySelect.innerHTML += '<option value="0" disabled>Out of Stock</option>';
                        quantitySelect.disabled = true;
                    }
                } else {
                    quantitySelect.disabled = true;
                }
            });
        } 
        //if accessory - enable quantity
        else {
            quantitySelect.innerHTML = '<option value="">SELECT QUANTITY</option>';
            for (let q = 1; q <= 5; q++) {
                quantitySelect.innerHTML += `<option value="${q}">${q}</option>`;
            }
            quantitySelect.disabled = false;
        }
    });

    //size selection functionality
    const sizeButtons = document.querySelectorAll('.size-btns button');
    const quantityInput = document.getElementById('quantity-input');
    const sizesDataElement = document.getElementById('sizes-data');
    
    if (sizeButtons.length > 0 && sizesDataElement) {
        const sizesData = JSON.parse(sizesDataElement.getAttribute('data-sizes') || '{}');
        let selectedSize = '';
        
        //size button click handler
        sizeButtons.forEach(button => {
            button.addEventListener('click', function() {

                sizeButtons.forEach(btn => btn.classList.remove('active'));
                
                //add active class to clicked button
                this.classList.add('active');
                
                selectedSize = this.getAttribute('data-size');
                
                //update quantity input max based on available stock
                const maxQuantity = sizesData[selectedSize] || 0;
                const availableQuantity = Math.min(maxQuantity, 10);
                
                if (quantityInput) {
                    quantityInput.max = availableQuantity;
                    
                    //if current quantity exceeds available, set to available max
                    if (quantityInput.value > availableQuantity) {
                        quantityInput.value = availableQuantity;
                    }
                }
                
                console.log('Selected size:', selectedSize, 'Max quantity:', availableQuantity);
            });
        });
        
        //auto-select first size if available
        if (sizeButtons.length > 0) {
            sizeButtons[0].click();
        }
    }

    //add to cart functionality
    const addCartButtons = document.querySelectorAll('.add-cart-btn');
    
    addCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card') || this.closest('.product-right');
            const sizeSelect = productCard.querySelector('select[name="size"]');
            const quantitySelect = productCard.querySelector('select[name="quantity"]');
            const sizeButtons = productCard.querySelectorAll('.size-btns button.active');
            const quantityInput = productCard.querySelector('input[type="number"]'); 

            let size = '';
            let quantity = '';

            //determine size based on interface type
            if (sizeSelect) {
                
                size = sizeSelect.value;
            } else if (sizeButtons.length > 0) {
           
                size = sizeButtons[0].getAttribute('data-size');
            } else {
                //no sizes available
                size = 'N/A';
            }

            //determine quantity based on interface type
            if (quantitySelect) {
         
                quantity = quantitySelect.value;
            } else if (quantityInput) {
          
                quantity = quantityInput.value;
            }

            //validation
            if (!quantity || quantity === "" || quantity <= 0) {
                alert('Please select a valid quantity');
                return;
            }
            
            //only require size selection if sizes are available in dropdown
            if (sizeSelect && (!size || size === "")) {
                alert('Please select size');
                return;
            }

            //only require size selection if sizes are available as buttons
            if (sizeButtons.length > 0 && (!size || size === "")) {
                alert('Please select size');
                return;
            }

            const productId = this.getAttribute('data-id');

            console.log('Adding to cart:', {
                productId: productId,
                size: size,
                quantity: quantity
            });

            //form submit
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'add_to_cart.php';
            form.innerHTML = `
                <input type="hidden" name="product_id" value="${productId}">
                <input type="hidden" name="size" value="${size}">
                <input type="hidden" name="quantity" value="${quantity}">
            `;
            document.body.appendChild(form);
            form.submit();
        });
    });

    //filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            //remove active class from all buttons and add to current
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            //filter products
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.closest('td').style.display = '';
                } else {
                    card.closest('td').style.display = 'none';
                }
            });
        });
    });

    //set ALL as active by default on page load
    if (filterButtons.length > 0) {
        document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
    }
});
