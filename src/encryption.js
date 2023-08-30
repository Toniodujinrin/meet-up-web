import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import { Buffer } from 'buffer';



class Encryption{

    decryptGroupKey = (privateKey, groupKey)=>{
        var decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        var decrypted = decrypt.decrypt(groupKey);
        decrypted = Buffer.from(decrypted, "utf-8").toString("base64")
        return(decrypted)
    }
    


    encryptMessage = (body, groupKey)=>{
        const stringedBody = JSON.stringify(body)
        const encrypted = AES.encrypt(stringedBody, groupKey).toString()
        return encrypted
    } 

    decryptMessage = (encrypted,groupKey)=>{
        const decrypted = AES.decrypt(encrypted,groupKey)
        return decrypted.toString(CryptoJS.enc.Utf8)
    }

}
 
export default Encryption;
