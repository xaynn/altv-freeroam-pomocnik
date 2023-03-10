// DO NOT EDIT
/*
 * © 2021 - 2021 Alec S. - DerEchteAlec - All Rights Reserved.
 * Last Updated : 01/06/2021 22:00:00
 */

import * as alt from 'alt-client';
import * as native from 'natives';
import * as NativeUI from './NativeUI/NativeUI';

// THIS CAN YOU EDIT
const MenuSettings = {
    Point: new NativeUI.Point(50, 50),
    TitleScale: 0.8,
    TitleFont: NativeUI.Font.Monospace,
    DropShadow: true,
    TextAlignment: NativeUI.Alignment.Centered,
}

const KeyControlls = {
    ToggleAltV: 117,
}

const EventNames = {
    ToggleMenu: "Client:ClothingMenu:Toggle",
}

const MenuText = {
    MenuTitle: "Better Clothing Menu",
    MenuSubTitle: "",

    MaskenText: "Masks",
    HairStylesText: "Hair Styles",
    TorsosText: "Torsos",
    LegsText: "Leg",
    BagandParachuteText: "Bag and Parachute",
    ShoeText: "Shoe",
    AccessoriesText: "Accessorie",
    UndershirtText: "Undershirt",
    BodyArmorText: "Body Armor",
    DecalsText: "Decal",
    TopText: "Top",
    HatText: "Hat",
    GlassesText: "Glasses",
    EarsText: "Ears",
    WatchesText: "Watches",
    BraceletsText: "Bracelets",
    SaveClothes: "SaveClothes",


}


function getClothesData(){
let maskdrawable = MasksDrawable.SelectedValue
let masktexture = MasksTexture.SelectedValue




let drawablehair = HairDrawable.SelectedValue;
let texture1hair = Hair1Texture.SelectedValue;
let texture2hair = Hair2Texture.SelectedValue;

let drawabletorso = TorsosDrawable.SelectedValue;
let texturetorso = TorsosTexture.SelectedValue;


let drawablelegs = LegsDrawable.SelectedValue;
let texturelegs = LegsTexture.SelectedValue;

let drawablebags = BagsDrawable.SelectedValue;
let texturebags = BagsTexture.SelectedValue;


let drawableshoes = ShoesDrawable.SelectedValue;
let textureshoes = ShoesTexture.SelectedValue;

let drawableaccessories = AccessoriesDrawable.SelectedValue;
    let textureaccesories = AccessoriesTexture.SelectedValue;


    let drawableundershirts = UndershirtsDrawable.SelectedValue;
    let textureundershirts = UndershirtsTexture.SelectedValue;


    let drawablebodyarmors = BodyArmorsDrawable.SelectedValue;
    let texturebodyarmors = BodyArmorsTexture.SelectedValue;

    let drawabledecals = DecalsDrawable.SelectedValue;
    let texturedecals = DecalsTexture.SelectedValue;


    let drawabletops = TopsDrawable.SelectedValue;
    let texturetops = TopsTexture.SelectedValue;


    let drawablehats = HatsDrawable.SelectedValue;
    let texturehats = HatsTexture.SelectedValue;

    let drawableglasses = GlassesDrawable.SelectedValue;
    let textureglasses = GlassesTexture.SelectedValue;

    let drawableears = EarsDrawable.SelectedValue;
    let textureears = EarsTexture.SelectedValue;



    let drawablewatches = WatchesDrawable.SelectedValue;
    let texturewatches = WatchesTexture.SelectedValue;

    let drawablebracelets = BraceletsDrawable.SelectedValue;
    let texturebracelets = BraceletsTexture.SelectedValue;


    alt.emitServer('getClothesAndSaveToDb', maskdrawable, masktexture, drawablehair, texture1hair, texture2hair, drawabletorso, texturetorso, drawablelegs, texturelegs, drawablebags, texturebags, drawableshoes, textureshoes,drawableaccessories, textureaccesories, drawableundershirts, textureundershirts, drawablebodyarmors, texturebodyarmors, drawabledecals, texturedecals, drawabletops, texturetops, drawablehats, texturehats, drawableglasses, textureglasses, drawableears, textureears, drawablewatches, texturewatches, drawablebracelets,texturebracelets  )
}


function SetClothesToChar(clothes){
    
    //alt.log(JSON.parse(clothes)); // SHOWS THE RIGHT OBJECT ON CLIENT
    let convertedclothes = JSON.parse(clothes)

    convertedclothes.forEach((number, index) => {
        //console.log('Index: ' + index + ' Value: ' + number);
        //console.log(number[0])
        //console.log(number[1])

        native.setPedComponentVariation(alt.Player.local.scriptID, number[0], number[1], number[2], number[3])
        //native.setPedComponentVariation(alt.Player.local.scriptID, 1, drawable, texture, 0);

    });
        //native.setPedComponentVariation(alt.Player.local.scriptID, 2, drawable, 0, 0);
        //native.setPedComponentVariation(alt.Player.local.scriptID, i +1, drawable, texture, 0);
    


}
alt.onServer('setCharClothes', SetClothesToChar);

const MaxListItems = 800;


// DO NOT EDIT
const ClothingMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
ClothingMenu.Visible = false;
ClothingMenu.GetTitle().Scale = MenuSettings.TitleScale,
ClothingMenu.GetTitle().Font = MenuSettings.TitleFont;
ClothingMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
ClothingMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;

// ========================================================================================================
// Masks

let MasksItem = new NativeUI.UIMenuItem(MenuText.MaskenText, "");
let MasksMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
MasksMenu.GetTitle().Scale = MenuSettings.TitleScale;
MasksMenu.GetTitle().Font = MenuSettings.TitleFont;
MasksMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
MasksMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(MasksMenu, MasksItem);


let MasksDrawable = new NativeUI.UIMenuAutoListItem("Drawable: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 1));
let MasksTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 1, native.getPedDrawableVariation(alt.Player.local.scriptID, 1)));

MasksMenu.AddItem(MasksDrawable);
MasksMenu.AddItem(MasksTexture);

MasksMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = MasksDrawable.SelectedValue;
    let texture = MasksTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 1, drawable, texture, 0);
});

// ========================================================================================================
// Hairs

let HairStylesItem = new NativeUI.UIMenuItem(MenuText.HairStylesText, "");
let HairStylesMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
HairStylesMenu.GetTitle().Scale = MenuSettings.TitleScale;
HairStylesMenu.GetTitle().Font = MenuSettings.TitleFont;
HairStylesMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
HairStylesMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(HairStylesMenu, HairStylesItem);

let HairDrawable = new NativeUI.UIMenuAutoListItem("Hair: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 2));
let Hair1Texture = new NativeUI.UIMenuAutoListItem("Color 1: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 2, native.getPedDrawableVariation(alt.Player.local.scriptID, 2)));
let Hair2Texture = new NativeUI.UIMenuAutoListItem("Color 2: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 2, native.getPedDrawableVariation(alt.Player.local.scriptID, 2)));

HairStylesMenu.AddItem(HairDrawable);
HairStylesMenu.AddItem(Hair1Texture);
HairStylesMenu.AddItem(Hair2Texture);

HairStylesMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = HairDrawable.SelectedValue;
    let texture1 = Hair1Texture.SelectedValue;
    let texture2 = Hair2Texture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 2, drawable, 0, 0);
    native.setPedHairColor(alt.Player.local.scriptID, texture1, texture2);
});

// ========================================================================================================
// Torso

let TorsosItem = new NativeUI.UIMenuItem(MenuText.TorsosText, "");
let TorsosMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
TorsosMenu.GetTitle().Scale = MenuSettings.TitleScale;
TorsosMenu.GetTitle().Font = MenuSettings.TitleFont;
TorsosMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
TorsosMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(TorsosMenu, TorsosItem);

let TorsosDrawable = new NativeUI.UIMenuAutoListItem("Torso: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 3));
let TorsosTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 3, native.getPedDrawableVariation(alt.Player.local.scriptID, 3)));

TorsosMenu.AddItem(TorsosDrawable);
TorsosMenu.AddItem(TorsosTexture);

TorsosMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = TorsosDrawable.SelectedValue;
    let texture = TorsosTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 3, drawable, texture, 0);

});

// ========================================================================================================
// Legs

let LegsItem = new NativeUI.UIMenuItem(MenuText.LegsText, "");
let LegsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
LegsMenu.GetTitle().Scale = MenuSettings.TitleScale;
LegsMenu.GetTitle().Font = MenuSettings.TitleFont;
LegsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
LegsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(LegsMenu, LegsItem);

let LegsDrawable = new NativeUI.UIMenuAutoListItem("Leg: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 4));
let LegsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 4, native.getPedDrawableVariation(alt.Player.local.scriptID, 4)));

LegsMenu.AddItem(LegsDrawable);
LegsMenu.AddItem(LegsTexture);

LegsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = LegsDrawable.SelectedValue;
    let texture = LegsTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 4, drawable, texture, 0);

});

// ========================================================================================================
// Bags

let BagsItem = new NativeUI.UIMenuItem(MenuText.BagandParachuteText, "");
let BagsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
BagsMenu.GetTitle().Scale = MenuSettings.TitleScale;
BagsMenu.GetTitle().Font = MenuSettings.TitleFont;
BagsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
BagsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(BagsMenu, BagsItem);

let BagsDrawable = new NativeUI.UIMenuAutoListItem("Bag and Parachute: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 5));
let BagsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 5, native.getPedDrawableVariation(alt.Player.local.scriptID, 5)));

BagsMenu.AddItem(BagsDrawable);
BagsMenu.AddItem(BagsTexture);

BagsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = BagsDrawable.SelectedValue;
    let texture = BagsTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 5, drawable, texture, 0);

});

// ========================================================================================================
// Shoes

let ShoesItem = new NativeUI.UIMenuItem(MenuText.ShoeText, "");
let ShoesMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
ShoesMenu.GetTitle().Scale = MenuSettings.TitleScale;
ShoesMenu.GetTitle().Font = MenuSettings.TitleFont;
ShoesMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
ShoesMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(ShoesMenu, ShoesItem);

let ShoesDrawable = new NativeUI.UIMenuAutoListItem("Shoe: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 6));
let ShoesTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 6, native.getPedDrawableVariation(alt.Player.local.scriptID, 6)));

ShoesMenu.AddItem(ShoesDrawable);
ShoesMenu.AddItem(ShoesTexture);

ShoesMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = ShoesDrawable.SelectedValue;
    let texture = ShoesTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 6, drawable, texture, 0);

});

// ========================================================================================================
// Accessories

let AccessoriesItem = new NativeUI.UIMenuItem(MenuText.AccessoriesText, "");
let AccessoriesMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
AccessoriesMenu.GetTitle().Scale = MenuSettings.TitleScale;
AccessoriesMenu.GetTitle().Font = MenuSettings.TitleFont;
AccessoriesMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
AccessoriesMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(AccessoriesMenu, AccessoriesItem);

let AccessoriesDrawable = new NativeUI.UIMenuAutoListItem("Accessorie: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 7));
let AccessoriesTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 7, native.getPedDrawableVariation(alt.Player.local.scriptID, 7)));

AccessoriesMenu.AddItem(AccessoriesDrawable);
AccessoriesMenu.AddItem(AccessoriesTexture);

AccessoriesMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = AccessoriesDrawable.SelectedValue;
    let texture = AccessoriesTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 7, drawable, texture, 0);

});

// ========================================================================================================
// Undershirts

let UndershirtsItem = new NativeUI.UIMenuItem(MenuText.UndershirtText, "");
let UndershirtsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
UndershirtsMenu.GetTitle().Scale = MenuSettings.TitleScale;
UndershirtsMenu.GetTitle().Font = MenuSettings.TitleFont;
UndershirtsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
UndershirtsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(UndershirtsMenu, UndershirtsItem);

let UndershirtsDrawable = new NativeUI.UIMenuAutoListItem("Undershirt: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 8));
let UndershirtsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 8, native.getPedDrawableVariation(alt.Player.local.scriptID, 8)));

UndershirtsMenu.AddItem(UndershirtsDrawable);
UndershirtsMenu.AddItem(UndershirtsTexture);

UndershirtsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = UndershirtsDrawable.SelectedValue;
    let texture = UndershirtsTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 8, drawable, texture, 0);
});

// ========================================================================================================
// BodyArmors

let BodyArmorsItem = new NativeUI.UIMenuItem(MenuText.BodyArmorText, "");
let BodyArmorsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
BodyArmorsMenu.GetTitle().Scale = MenuSettings.TitleScale;
BodyArmorsMenu.GetTitle().Font = MenuSettings.TitleFont;
BodyArmorsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
BodyArmorsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(BodyArmorsMenu, BodyArmorsItem);

let BodyArmorsDrawable = new NativeUI.UIMenuAutoListItem("Body Armor: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 9));
let BodyArmorsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 9, native.getPedDrawableVariation(alt.Player.local.scriptID, 9)));

BodyArmorsMenu.AddItem(BodyArmorsDrawable);
BodyArmorsMenu.AddItem(BodyArmorsTexture);

BodyArmorsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = BodyArmorsDrawable.SelectedValue;
    let texture = BodyArmorsTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 9, drawable, texture, 0);
});

// ========================================================================================================
// Decals

let DecalsItem = new NativeUI.UIMenuItem(MenuText.DecalsText, "");
let DecalsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
DecalsMenu.GetTitle().Scale = MenuSettings.TitleScale;
DecalsMenu.GetTitle().Font = MenuSettings.TitleFont;
DecalsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
DecalsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(DecalsMenu, DecalsItem);

let DecalsDrawable = new NativeUI.UIMenuAutoListItem("Decal: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 10));
let DecalsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 10, native.getPedDrawableVariation(alt.Player.local.scriptID, 10)));

DecalsMenu.AddItem(DecalsDrawable);
DecalsMenu.AddItem(DecalsTexture);

DecalsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = DecalsDrawable.SelectedValue;
    let texture = DecalsTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 10, drawable, texture, 0);

});

// ========================================================================================================
// Tops

let TopsItem = new NativeUI.UIMenuItem(MenuText.TopText, "");
let TopsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
TopsMenu.GetTitle().Scale = MenuSettings.TitleScale;
TopsMenu.GetTitle().Font = MenuSettings.TitleFont;
TopsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
TopsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(TopsMenu, TopsItem);

let TopsDrawable = new NativeUI.UIMenuAutoListItem("Top: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 11));
let TopsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 11, native.getPedDrawableVariation(alt.Player.local.scriptID, 11)));

TopsMenu.AddItem(TopsDrawable);
TopsMenu.AddItem(TopsTexture);

TopsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = TopsDrawable.SelectedValue;
    let texture = TopsTexture.SelectedValue;

    native.setPedComponentVariation(alt.Player.local.scriptID, 11, drawable, texture, 0);

});

// ========================================================================================================
// Hats

let HatsItem = new NativeUI.UIMenuItem(MenuText.HatText, "");
let HatsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
HatsMenu.GetTitle().Scale = MenuSettings.TitleScale;
HatsMenu.GetTitle().Font = MenuSettings.TitleFont;
HatsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
HatsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(HatsMenu, HatsItem);

let HatsDrawable = new NativeUI.UIMenuAutoListItem("Hat: ", "", -MaxListItems, MaxListItems, -1, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 0));
let HatsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, 0, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 0)));

HatsMenu.AddItem(HatsDrawable);
HatsMenu.AddItem(HatsTexture);

HatsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = HatsDrawable.SelectedValue;
    let texture = HatsTexture.SelectedValue;

    native.clearPedProp(alt.Player.local.scriptID, 0);
    native.setPedPropIndex(alt.Player.local.scriptID, 0, drawable, texture, false);
});

// ========================================================================================================
// Glasses

let GlassesItem = new NativeUI.UIMenuItem(MenuText.GlassesText, "");
let GlassesMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
GlassesMenu.GetTitle().Scale = MenuSettings.TitleScale;
GlassesMenu.GetTitle().Font = MenuSettings.TitleFont;
GlassesMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
GlassesMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(GlassesMenu, GlassesItem);

let GlassesDrawable = new NativeUI.UIMenuAutoListItem("Glasses: ", "", -MaxListItems, MaxListItems, -1, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 1));
let GlassesTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, 1, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 1)));

GlassesMenu.AddItem(GlassesDrawable);
GlassesMenu.AddItem(GlassesTexture);

GlassesMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = GlassesDrawable.SelectedValue;
    let texture = GlassesTexture.SelectedValue;

    native.clearPedProp(alt.Player.local.scriptID, 1);
    native.setPedPropIndex(alt.Player.local.scriptID, 1, drawable, texture, false);
});

// ========================================================================================================
// Ears

let EarsItem = new NativeUI.UIMenuItem(MenuText.EarsText, "");
let EarsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
EarsMenu.GetTitle().Scale = MenuSettings.TitleScale;
EarsMenu.GetTitle().Font = MenuSettings.TitleFont;
EarsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
EarsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(EarsMenu, EarsItem);

let EarsDrawable = new NativeUI.UIMenuAutoListItem("Ears: ", "", -MaxListItems, MaxListItems, -1, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 2));
let EarsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, 2, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 2)));

EarsMenu.AddItem(EarsDrawable);
EarsMenu.AddItem(EarsTexture);

EarsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = EarsDrawable.SelectedValue;
    let texture = EarsTexture.SelectedValue;

    native.clearPedProp(alt.Player.local.scriptID, 2);
    native.setPedPropIndex(alt.Player.local.scriptID, 2, drawable, texture, false);
});

// ========================================================================================================
// Watches

let WatchesItem = new NativeUI.UIMenuItem(MenuText.WatchesText, "");
let WatchesMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
WatchesMenu.GetTitle().Scale = MenuSettings.TitleScale;
WatchesMenu.GetTitle().Font = MenuSettings.TitleFont;
WatchesMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
WatchesMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(WatchesMenu, WatchesItem);

let WatchesDrawable = new NativeUI.UIMenuAutoListItem("Watches: ", "", -MaxListItems, MaxListItems, -1, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 6));
let WatchesTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, 6, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 6)));

WatchesMenu.AddItem(WatchesDrawable);
WatchesMenu.AddItem(WatchesTexture);

WatchesMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = WatchesDrawable.SelectedValue;
    let texture = WatchesTexture.SelectedValue;

    native.clearPedProp(alt.Player.local.scriptID, 6);
    native.setPedPropIndex(alt.Player.local.scriptID, 6, drawable, texture, false);
});

// ========================================================================================================
// Bracelets

let BraceletsItem = new NativeUI.UIMenuItem(MenuText.BraceletsText, "");
let BraceletsMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
BraceletsMenu.GetTitle().Scale = MenuSettings.TitleScale;
BraceletsMenu.GetTitle().Font = MenuSettings.TitleFont;
BraceletsMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
BraceletsMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(BraceletsMenu, BraceletsItem);

let BraceletsDrawable = new NativeUI.UIMenuAutoListItem("Bracelets: ", "", -MaxListItems, MaxListItems, -1, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 7));
let BraceletsTexture = new NativeUI.UIMenuAutoListItem("Texture: ", "", -MaxListItems, MaxListItems, 0, native.getNumberOfPedPropTextureVariations(alt.Player.local.scriptID, 7, native.getNumberOfPedPropDrawableVariations(alt.Player.local.scriptID, 7)));

BraceletsMenu.AddItem(BraceletsDrawable);
BraceletsMenu.AddItem(BraceletsTexture);

BraceletsMenu.AutoListChange.on((selectedItem, selectedItemIndex) => {
    let drawable = BraceletsDrawable.SelectedValue;
    let texture = BraceletsTexture.SelectedValue;

    native.clearPedProp(alt.Player.local.scriptID, 7);
    native.setPedPropIndex(alt.Player.local.scriptID, 7, drawable, texture, false);
});


//save
let SaveClothesItem = new NativeUI.UIMenuItem(MenuText.SaveClothes, "");

let SaveClothesMenu = new NativeUI.Menu(MenuText.MenuTitle, MenuText.MenuSubTitle, MenuSettings.Point);
SaveClothesMenu.GetTitle().Scale = MenuSettings.TitleScale;
SaveClothesMenu.GetTitle().Font = MenuSettings.TitleFont;
SaveClothesMenu.GetTitle().DropShadow = MenuSettings.DropShadow;
SaveClothesMenu.GetTitle().TextAlignment = MenuSettings.TextAlignment;
ClothingMenu.AddSubMenu(SaveClothesMenu, SaveClothesItem);

SaveClothesMenu.AddItem(new NativeUI.UIMenuListItem(
  	"List Item",
   	"Description for List Item",
   	new NativeUI.ItemsCollection(["Zapisz"])
));


export function getAllPlayerClothes() {
  //  var clothes = {
      //  id: [
           // {
              //  drawableId: 0,
              //  textureId: 0,
           // },
          //  {
             //   drawableId: 0,
           //     textureId: 0,
          //  },
         //   {
            //    drawableId: 0,
            //    textureId: 0,
           // },
           // {
             //   drawableId: 0,
            //    textureId: 0,
           // },
         //   {
             //   drawableId: 0,
             //   textureId: 0,
           // },
         //   {
             //   drawableId: 0,
             //   textureId: 0,
           // },
          //  {
            //    drawableId: 0,
            //    textureId: 0,
           // },
         //   {
              //  drawableId: 0,
            //    textureId: 0,
           // },
          //  {
             //   drawableId: 0,
             //   textureId: 0,
           // },
           // {
            //    drawableId: 0,
           //     textureId: 0,
          //  },
       // ],
   // };
  let components = [];
    for(var i=1;i<12;i++) {
        var drawable = native.getPedDrawableVariation(alt.Player.local.scriptID, i)
        var texture = native.getPedTextureVariation(alt.Player.local.scriptID, i)
      var tmp = [i,drawable,texture,2];
       components.push(tmp);
    }
    alt.emitServer('getClothesAndSaveToDb', JSON.stringify(components)  )
   
   // alt.emitServer('getClothesAndSaveToDb', JSON.stringify(clothes)  )


}

SaveClothesMenu.ItemSelect.on(item => {
    if (item instanceof NativeUI.UIMenuListItem) {
        alt.log(item.SelectedItem.DisplayText, item.SelectedItem.Data);
        //getClothesData()
        getAllPlayerClothes()
     } else if (item instanceof NativeUI.UIMenuSliderItem) {
         alt.log(item.Text, item.Index, item.IndexToItem(item.Index));
     } else {
         alt.log(item.Text);
     }
});
// ========================================================================================================
// Event Section

alt.on("keyup", (key) => {
   if(key === KeyControlls.ToggleAltV) {
       ClothingMenu.Visible = !ClothingMenu.Visible;
   }
});

alt.onServer(EventNames.ToggleMenu, () => {
   ClothingMenu.Visible = !ClothingMenu.Visible;
});

alt.on(EventNames.ToggleMenu, () => {
    ClothingMenu.Visible = !ClothingMenu.Visible;
});


