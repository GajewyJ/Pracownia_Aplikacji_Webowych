numberDec = int(input("Podaj liczbę dziesiętną: "))
numberBin = ""

while numberDec > 0:
    numberBin = str(numberDec % 2) + numberBin
    numberDec = numberDec // 2

bloki = 1
character = numberBin[0]

for i in range(1, len(numberBin)):
    if(character != numberBin[i]):
        bloki += 1
        character = numberBin[i]

print(bloki)