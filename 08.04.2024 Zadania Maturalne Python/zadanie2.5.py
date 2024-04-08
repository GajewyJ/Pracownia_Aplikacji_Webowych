file = open("Dane_2305/bin.txt", 'r')
content = file.read()
wyniki = open("wyniki2_5.txt", 'w')

for line in content.split('\n'):
    numberBin = line
    numberDec = 0
    x = 1

    for i in range(len(numberBin) - 1, -1, -1):
        numberDec += int(numberBin[i]) * x
        x *= 2

    p = numberDec
    pdiv2 = numberDec // 2

    resDec = p ^ pdiv2
    resBin = ""
    while resDec > 0:
        resBin = str(resDec % 2) + resBin
        resDec = resDec // 2

    wyniki.write(resBin + "\n")

file.close()
wyniki.close()