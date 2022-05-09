# script adapted from https://betterprogramming.pub/create-your-own-nft-collection-with-python-82af40abf99f

import json
import os

f = open('./output/all-traits.json',)
data = json.load(f)

IMAGES_BASE_URL = str(input("Enter base image URL: "))
PROJECT_NAME = "PlaNFTs"

def getAttribute(key, value):
    return {
        "trait_type": key,
        "value": value
    }

os.makedirs(os.path.join(os.getcwd(), r'output/metadata/'))

for i in data:
    token_id = i['tokenId']
    token = {
        "image": IMAGES_BASE_URL + '/' + str(token_id) + '.png',
        "tokenId": token_id,
        "name": PROJECT_NAME + ' ' + str(token_id),
        "attributes": []
    }
    token["attributes"].append(getAttribute("background", i["background"]))
    token["attributes"].append(getAttribute("floor", i["floor"]))
    token["attributes"].append(getAttribute("pot", i["pot"]))
    token["attributes"].append(getAttribute("plant", i["plant"]))

    with open('./output/metadata/' + str(token_id) + ".json", 'w') as outfile:
        json.dump(token, outfile, indent=4)
f.close()

print("Metadata generated. Upload to IPFS in order to get the base URL for your contract.")
