file = open("Dane_2305/pi.txt", 'r')

nums = file.read()
numbers = nums.split()

res = 0

for i in range(0, len(numbers) - 1):
    x = numbers[i] + numbers[i + 1]
    x = int(x)
    if(x > 90):
        res += 1

print(res)

file.close()