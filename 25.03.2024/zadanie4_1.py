file = open("Dane_2305/przyklad.txt", "r")
writeFile = open("wyniki4_1.txt", "w")

for i in file:
    w = i.count("w")
    k = i.count("k")
    if w == k:
        writeFile.write(i)

file.close()
writeFile.close()