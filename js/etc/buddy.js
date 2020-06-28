class Buddy {
    constructor(nickname) {
        this.nickname = nickname;
        this.id = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.random(16));
        this.status = 'online';
        this.color = Cryptodog.color.pop();
        // Regularly reset at the interval defined by Cryptodog.maxMessageInterval.
        this.messageCount = 0;
        if (Cryptodog.isFiltered(this.nickname) && !this.ignored()) {
            console.log("Filtering user '" + this.nickname + "', as isFiltered() returned true.");
            this.toggleIgnored();
        }
    }

    setStatus(status) {
        this.status = status;
        $('#buddy-' + this.id).attr('status', status);
    }

    setComposing() {
        $('#buddy-' + this.id).addClass('composing');
    }

    setPaused() {
        $('#buddy-' + this.id).removeClass('composing');
    }

    ignored() {
        return Cryptodog.ignoredNicknames.indexOf(this.nickname) !== -1;
    }

    toggleIgnored() {
        if (this.ignored()) {
            Cryptodog.ignoredNicknames.splice(Cryptodog.ignoredNicknames.indexOf(this.nickname), 1);
            $('#buddy-' + this.id).removeClass('ignored');
        }
        else {
            Cryptodog.ignoredNicknames.push(this.nickname);
            $('#buddy-' + this.id).addClass('ignored');
        }
    }

    setKeys(publicKey, secretKey) {
        this.mpPublicKey = publicKey;
        this.mpSecretKey = secretKey;
        this.mpFingerprint = multiparty.fingerprint(this.mpPublicKey);
    }

    updateAuth(auth) {
        this.authenticated = auth;
        $('#authenticated').attr('data-active', this.authenticated);
        $('#notAuthenticated').attr('data-active', !this.authenticated);
    }
}
