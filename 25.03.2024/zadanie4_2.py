file = open("Dane_2305/przyklad.txt", "r")
writeFile = open("wyniki4_2.txt", "w")

for i in file:
    w = i.count("w")
    a = i.count("a")
    k = i.count("k")
    c = i.count("c")
    j = i.count("j")
    e = i.count("e")

    if(w == 0 or a < 2 or k == 0 or c == 0 or j == 0 or e == 0):
        writeFile.write("0 ")
    else:
        pomA = a % 2
        a = (a - pomA) / 2
        a = int(a)
        counts = [w, a, k, c, j , e]
        writeFile.write(str(min(counts)) + " ")


file.close()
writeFile.close()