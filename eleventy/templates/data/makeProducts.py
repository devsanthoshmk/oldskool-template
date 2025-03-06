import json
import random

# Generate dummy product data
def generate_products(num_products=10):
    products = []
    with open(f"./templates\data\products.json") as file:
        data=json.load(file)
    for i in data:
        product = {
            "description": f"This is a dummy description for product {i}.",
            "ingredients": [
                f"Ingredient {random.randint(1, 100)}",
                f"Ingredient {random.randint(101, 200)}",
                f"Ingredient {random.randint(201, 300)}"
            ]
        }
        products.append(i | product)
    return products

# Generate data
num_products = 10  # Change this number to generate more products
data = generate_products(num_products)

# Save to a JSON file
# for prod in data:
with open(f"./templates\data\product_details.json", "w") as file:
    json.dump(data, file, indent=4)
print(data)
print("JSON file 'products.json' generated successfully!")
