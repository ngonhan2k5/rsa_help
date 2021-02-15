# rsa_help - Automation connect VPN (Almost)
Simplify daily VPN AnyConnect login using bash and nodejs

### Requirements:
- Linux bash environent with nodejs
- Any connect installed on PC/MAC
- RSA SecurID installed on Android (Not tested on Iphone)
### Steps:
1. On computer close AnyConnect if is is running (GUI)
2. Config *~\.vpn* (username and password) and *connect.sh* (VPN_SERVER Url, passcode HEAD)
3. Run `sh bash/connect.sh vpn_url passhead` from vpncon
4. Open: http://localhost:9999 and scan the barcode using your Android phone to get a https link
5. Open that https link on Phone and follow the instruction:
    - Accept the unsecure to allow open self-sign ssl, we need https to allow page read clipboard.
    - Accept to allow read clipboard.
    - Click link to open RSA SecurID, click Copy then back to webpage.
6. Check terminal of Step 3. to see if VPN connected.
7. If vpn is disconnected due to no activites or limited time session just repeat step 6.

## Notes: 
- This was confirmed work on MAC + Android Phone.
- Step 5 is to gen link with your PC LAN address, you can open directly by input https://IP_ADDRESS/send.html on your Phone
- Rarely the VPN will ask for passcode 2 times to avoid automation, then you have to connect by GUI once then can use this automation again.
