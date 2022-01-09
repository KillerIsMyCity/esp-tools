
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum Encryption {
    //% block="OPEN"
    OPEN = 0,
    //% block="WPA_PSK"
    WPA_PSK = 1,
    //% block="WPA2_PSK"
    WPA2_PSK = 2,
    //% block="WPA_WPA2_PSK"
    WPA_WPA2_PSK = 3
}
//% weight=5 color=#43C800 icon="f8dd"
namespace ESP8266Tools {
    /**
     * Sends AT Commands to ESP Module
     */
    //% blockId="ATcommand"
    //% block="Send AT Commands $AT"
    export function ATcommand(AT: string): void {
        serial.writeString(AT + "\u000D\u000A ")
    }
    /**
     * Resets ESP module
     */
    //% blockId="resetEsp"
    //% block="Reset ESP Module"
    export function resetEsp() {
        ATcommand("AT+RESTORE")
        basic.pause(1000)
        ATcommand("AT+RST")
    }
    /**
     * Creates Wifi AccessPoint with your specific details
     */
    //% blockId="CreateAP"
    //% block="Creates Wifi hotspot with ssid: $SSID and Password: $KEY with Encryption: $Enc=Encryption"
    export function CreateAP(SSID: string, KEY: string, Enc: Encryption): void {
        if (2 == 2) {
            ESP8266Tools.ATcommand("AT+CWSAP=\"" + SSID + "\",\"" + KEY + "\",1," + Enc)
        }
    }
    /**
     * Initialize ESP8266 module
     */
    //% block="set ESP8266|RX %tx|TX %rx|Baud rate %baudrate"
    //% tx.defl=SerialPin.P8
    //% rx.defl=SerialPin.P12
    //% ssid.defl=your_ssid
    //% pw.defl=your_password weight=100
    export function initWIFI(tx: SerialPin, rx: SerialPin, baudrate: BaudRate) {
        serial.redirect(tx, rx, BaudRate.BaudRate115200)
        basic.pause(100)
        serial.setTxBufferSize(128)
        serial.setRxBufferSize(128)
        resetEsp()
    }
}