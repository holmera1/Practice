# my first solution ended up working way better - accounts for lists with 0 much better and looks cleaner, but is slower - O(n^2) vs O(n)
def listProducts(nums):
    products = []
    if len(nums) != 0 and len(nums) != 1:
        for i in range(0, len(nums)):
            p = 1
            for x in range(0, len(nums)):
                if x != i:
                    p *= nums[x]
            products.append(p)
    return(products)

# second (division) solution sucks beacause it is way harder to account for lists that contain 0 
# def listProducts(nums):
#     products = []
#     if len(nums) == 0 or len(nums) == 1:
#         return products
#     result = 1
#     for j in nums:
#         result *= j
#     for i in nums:
#         if(i == 0):
#             products.append(result)
#         else:
#             products.append(int(result / i))
#     return(products)

print(listProducts([1, 0])) 