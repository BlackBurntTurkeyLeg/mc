import GuiScreen from "../GuiScreen.js";
import GuiKeyButton from "../widgets/GuiKeyButton.js";
import GuiButton from "../widgets/GuiButton.js";
import GuiSliderButton from "../widgets/GuiSliderButton.js";

export default class GuiControls extends GuiScreen {

    constructor(previousScreen) {
        super();

        this.previousScreen = previousScreen;
    }

    init() {
        super.init();

        let settings = this.minecraft.settings;

        let y = this.height / 2 - 50;
        this.buttonList.push(new GuiSliderButton("Mouse Sensitivity", settings.sensitivity, 50, 150, this.width / 2 - 100, y, 200, 20, value => {
            settings.sensitivity = value;
        }).setDisplayNameBuilder(function (name, value) {
            return name + ": " + value + "%";
        }));

        this.buttonList.push(new GuiKeyButton("Crouch", settings.crouching, this.width / 2 - 100, y + 24, 200, 20, key => {
            settings.crouching = key;
        }));

        this.buttonList.push(new GuiKeyButton("Sprint", settings.sprinting, this.width / 2 - 100, y + 24 * 2, 200, 20, key => {
            settings.sprinting = key;
        }));

        this.buttonList.push(new GuiKeyButton("Toggle Perspective", settings.togglePerspective, this.width / 2 - 100, y + 24 * 3, 200, 20, key => {
            settings.togglePerspective = key;
        }));

        this.buttonList.push(new GuiButton("Done", this.width / 2 - 100, y + 130, 200, 20, () => {
            this.minecraft.displayScreen(this.previousScreen);
        }));
    }

    drawScreen(stack, mouseX, mouseY, partialTicks) {
        // Background
        this.drawDefaultBackground(stack);

        // Title
        this.drawCenteredString(stack, "Controls", this.width / 2, 50);

        super.drawScreen(stack, mouseX, mouseY, partialTicks);
    }

    onClose() {
        // Save settings
        this.minecraft.settings.save();
    }

}