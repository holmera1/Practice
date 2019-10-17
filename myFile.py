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


print(listProducts([1, 2, 3]))