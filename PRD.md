# VoiceMeeter web controler
## Description
I want to make an application for controlling my voicemeeter banana sound controler. I want the UI to be build using shadcn components. I want to basicaly replicate the UI of the voicemeeter, but with modern UI and some exceptions. 


## UI Layout
### Header
- There will be a header where the user would have option to change the ip of the controlling device, theme changer and button to put the web into full screen. 
- If the app is in full screen the header should dissapear. The user can exit the full screen by pressing F11, ESC or on mobile by the back button, additionaly, there can be a small button somewhere that would end the fullscreen 
- There will be also button for refreshing the engine, beacose I am constantly switching headphones and i need to reset the app for it to find out that my headphones are connected.
### Main
#### innitial Settings
- The first time the user should be prompted for some informattions about the device he wants to connect. So i am guessing some IP of the end device and maybe some key. Those settings would be saved into the localstorage so the user doesnt have to set them everytime, if something changes, he can click on the reset button in the header.
#### Loading/searching for the connection
- There should be some Ui telling the user that he is trying to connect to the device before the Main UI 
#### Main UI
The UI will then be split into three vertical sections:
1. Inputs:
    - There will be one, slim slider to control the levels and buttons for changing the ouput, such uas the hardware and virtual outputs, mute button and etc.
    - The reason that I am saing that there will be only one slider, is beacose on the top, there would be the name of the input in the select, where user could select which, of the three hardware input he would be controlling
2. Virtual inputs:
    - In voicemeeter banana, there are only two virtual inputs, and i need to display them everytime.
    - I want the sliders as well as the control buttons same as in the inpouts
3. Ouputs
    - I need to see all the outputs, physical as well as virtual.
    - I want to be able to mute the ouput with one single button. 


## Tools
npm, tailwind, shadcn, nextjs
### UI
- You will use as much shadcn components as possible
- You can make custom components, but stick with the default shadcn visuals and design
- Install whichever shadcn component you want.
### Dev
- You will be using next.js with typescript to develop this website.
- If you need to make some service for handling the connection or something you will use Express, but try to not use it, the app should be working mostly on the client side.

