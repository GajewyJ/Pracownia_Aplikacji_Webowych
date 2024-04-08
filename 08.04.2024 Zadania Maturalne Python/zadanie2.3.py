file = open("Dane_2305/bin.txt", 'r')
content = file.read()

max = 0
maxBin = ""

for line in content.split('\n'):
    numberBin = line
    numberDec = 0
    x = 1

    for i in range(len(numberBin) - 1, -1, -1):
        numberDec += int(numberBin[i]) * x
        x *= 2
    if(numberDec > max):
        max = numberDec
        maxBin = numberBin

print(maxBin)

file.close()