file = open("Dane_2305/bin.txt", 'r')

ile = 0

for line in file:
    numberBin = line

    bloki = 0
    character = numberBin[0]

    for i in range(1, len(numberBin)):
        if(character != numberBin[i]):
            bloki += 1
            character = numberBin[i]
            
    if(bloki <= 2):
        ile += 1

print(ile)

file.close()