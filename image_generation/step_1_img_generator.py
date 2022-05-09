# script adapted from https://betterprogramming.pub/create-your-own-nft-collection-with-python-82af40abf99f

from PIL import Image
from IPython.display import display
import random
import json
import os

backgrounds = ["Future Valley", "Gameboy", "Gradient", "Lasers", "Mountains",
               "Purple", "Space", "Sunset", "Trees", "Windows XP"]
background_weights = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]

floors = ["Brick", "Dirt", "Fence", "Forest", "Glass",
          "Moon", "Rainbow", "Sand", "Stone"]
floor_weights = [11, 11, 11, 11, 11, 11, 11, 11, 12]

pots = ["Alien", "Among Us", "Angry", "Ape", "BTC Maxi",
        "CIA", "Dead Yellow", "Duck", "Eth Maxi", "Ghost",
        "Isaac", "Meat", "PWN", "Rainbow", "Stoned"]
pot_weights = [6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]

plants = ["Basil", "Mint", "Sage", "Weed"]
plant_weights = [25, 25, 25, 25]

background_files = {
    "Future Valley": "future_valley",
    "Gameboy": "gameboy",
    "Gradient": "gradient",
    "Lasers": "lasers",
    "Mountains": "mountains",
    "Purple": "purple",
    "Space": "space",
    "Sunset": "sunset",
    "Trees": "trees",
    "Windows XP": "win_xp"
}

floor_files = {
    "Brick": "brick",
    "Dirt": "dirt",
    "Fence": "fence",
    "Forest": "forest",
    "Glass": "glass",
    "Moon": "moon",
    "Rainbow": "rainbow",
    "Sand": "sand",
    "Stone": "stone"
}

pot_files = {
    "Alien": "alien",
    "Among Us": "among_us",
    "Angry": "angry",
    "Ape": "ape",
    "BTC Maxi": "btc_maxi",
    "CIA": "cia",
    "Dead Yellow": "dead_yellow",
    "Duck": "duck",
    "Eth Maxi": "eth_maxi",
    "Ghost": "ghost",
    "Isaac": "isaac",
    "Meat": "meat",
    "PWN": "pwn",
    "Rainbow": "rainbow",
    "Stoned": "stoned"
}

plant_files = {
    "Basil": "basil",
    "Mint": "mint",
    "Sage": "sage",
    "Weed": "weed"
}

def main():

    total_images = int(input("Enter number of images to generate: "))

    all_images = []

    # Generate the unique combinations based on trait weightings
    for i in range(total_images):
        new_trait_image = create_new_image(all_images)
        all_images.append(new_trait_image)

    # Add token Id to each image
    i = 0
    for item in all_images:
        item["tokenId"] = i
        i = i + 1

    # Generate the images
    os.makedirs(os.path.join(os.getcwd(), r'output/images/'))

    for item in all_images:
        im1 = Image.open(f'./input/1_background/{background_files[item["background"]]}.png').convert('RGBA')
        im2 = Image.open(f'./input/2_floor/{floor_files[item["floor"]]}.png').convert('RGBA')
        im3 = Image.open(f'./input/3_pot/{pot_files[item["pot"]]}.png').convert('RGBA')
        im4 = Image.open(f'./input/4_plant/{plant_files[item["plant"]]}.png').convert('RGBA')

        com1 = Image.alpha_composite(im1, im2)
        com2 = Image.alpha_composite(com1, im3)
        com3 = Image.alpha_composite(com2, im4)

        #Convert to RGB
        rgb_im = com3.convert('RGB')
        file_name = str(item["tokenId"]) + ".png"
        rgb_im.save("./output/images/" + file_name)

        # create metadata file
        with open('./output/all-traits.json', 'w') as outfile:
            json.dump(all_images, outfile, indent=4)

    print("Images generated. Upload to IPFS to get the base image URL to generate metadata with step_2_meta_generator.py.")

def create_new_image(all_images):

    new_image = {}

    # For each trait category, select a random trait based on the weightings
    new_image["background"] = random.choices(backgrounds, background_weights)[0]
    new_image["floor"] = random.choices(floors, floor_weights)[0]
    new_image["pot"] = random.choices(pots, pot_weights)[0]
    new_image["plant"] = random.choices(plants, plant_weights)[0]

    if new_image in all_images: # make sure the image is unique
        return create_new_image(all_images)
    else:
        return new_image

main()
