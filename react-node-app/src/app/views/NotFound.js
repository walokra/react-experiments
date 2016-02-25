import React from 'react'; // eslint-disable-line no-unused-vars

import ReactBase from '../ReactBase';

export default class NotFound extends ReactBase {

    render() {
        return (
            <div className="container">
                <div className="row">

                    <h2>Etsimääsi sivua ei löytynyt</h2>
                    <p>
                        Sivua ei valitettavasti löytynyt. Tarkistathan, että kirjoittamasi osoite on
                        oikein.
                    </p>

                    <h2>Sidan som du sökte finns inte</h2>
                    <p>
                        Sidan kunde tyvärr inte hittas. Vänligen kontrollera att adressen är
                        korrekt.
                    </p>

                    <h2>The page you were looking for was not found</h2>
                    <p>
                        The page could not be found. Please make sure that the address is spelled
                        correctly.
                    </p>

                </div>
            </div>
        );
    }
}
