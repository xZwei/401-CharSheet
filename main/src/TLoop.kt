fun main(args : Array<String>) {
    var x: Int = 50
    var myArray = arrayOf(1, 2, 3, "four", 5.5, '6')

    //while and do-while work as normal
    while (x > 0) {
        print("$x ")
        x--
    }

    do {
        print("\n$x\n")
    } while (x < 0)

    //for loop can iterate through things with an iterator
    for (y in 1..25) print("$y ")
    for (item in myArray) print("\n$item")
}