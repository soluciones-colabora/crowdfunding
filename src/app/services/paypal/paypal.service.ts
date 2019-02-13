import { Injectable } from '@angular/core';

declare let paypal: any;

interface Style {
  layout:  'vertical' | 'horizontal';
  color:   'gold' | 'blue' | 'silver';
  shape:   'rect' | 'pill';
  label:   'paypal' | 'checkout' | 'pay' | 'installment';
  tagline: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor() {
    this.addPaypalScript().then(() => {
      // this.paypalButtons.forEach(button => {
      // paypal.Button.render(this.setPayPalConfig(button.paymentAmount, button.styleName), '#paypal-checkout'+ button.paymentAmount);
      // this.paypalLoad = false;
      // })
      paypal.Buttons(this.setPayPalConfig('500.00')).render('#paypal-button-container');
      paypal.Buttons(this.setPayPalConfig('250.00')).render('#paypal-button-container-2');
      paypal.Buttons(this.setPayPalConfig('150.00')).render('#paypal-button-container-3');
      paypal.Buttons(this.setPayPalConfig('50.00')).render('#paypal-button-container-4');
    });
  }

  addPaypalScript() {
    // this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypal.com/sdk/js?client-id=sb';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  setPayPalConfig(paymentAmount: string, buttonStyle?: Style) {

    return {
      style: {
        layout:  'vertical',
        color:   'gold',
        shape:   'rect',
        label:   'paypal',
        tagline: false
      },

      // payment() is called when the button is clicked
      createOrder: (data, actions) => {
        // Make a call to the REST api to create the payment
        console.log("data",data);
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01'
            }
          }]
        });
      },

      // onApprove() is called when the buyer approves the payment
      onApprove: (data, actions) => {
        // Capture the funds from the transaction
        return actions.order.capture().then(function(details) {
          // Show a success message to your buyer
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },

      onCancel: function(data, actions) {
        /*
         * Buyer cancelled the payment
        */
        window.alert('Payment Canceled!');
      },

      onError: function(err) {
        /*
         * An error occurred during the transaction
        */
        window.alert('Something went wrong with your payment!');
      }
    };
  }


}
