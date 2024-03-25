file = open("Dane_2305/przyklad.txt", "r")
writeFile = open("wyniki4_3.txt", "w")

w = "wakacje"
for i in file:
    res = 0
    s = 0
    for j in i:
        if j == w[s]:
            s += 1
            if s == 7 :
                s = 0
        else:
            res += 1
    writeFile.write(str(res + s - 1) + " ")

file.close()
writeFile.close()