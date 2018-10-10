// MAIN, just like in Java
fun main(args : Array<String>) {
    // NOTICE THE TYPE IS INFERRED BY KOTLIN, optional
    val name = "Name"   // IMMUTABLE VARIABLE / CONSTANT
    var myAge = 21      // MUTABLE/CAN CHANGE
    val a = 111
    val b = 111
    val space = "\n"

    //however, you can do this...
    val teststring: String      //init the constant on one line
    teststring = "This works!"  //assign it a value on another

    // Different variable types
    val bigInt: Int = Int.MAX_VALUE
    val doubleNum: Double = Double.MAX_VALUE
    var floatNum: Float = Float.MAX_VALUE
    var longNum: Long = Long.MAX_VALUE
    var issaChar: Char = 'A'
    var issaString: String = "wew lad issa string"
    var issaBool: Boolean = true

    // STRING STUFF

    //Notice that the print to console saves everything between the triple quotes
    val loooongString: String = """
        this
        is
        a
        long
        string
    """
    val trimmedloooongString: String = """
        this
        is
        a
        long
        string
    """.trimIndent()

    // Different ways to print to console...
    println("A large number: " + bigInt)
    println("another number: $doubleNum")

    // Different things you can do...
    println("Perform arithmatic inside a string: ${a * b}")
    println("Calculate String length in the string: ${loooongString.length}")
    println("Test equality in the string: ${a===b}")
    println("2nd index of name: ${name[2]}")
    println("2nd index of name: ${name.get(2)}") //same as above
    println(space)


    // Long string examples
    println(trimmedloooongString)
    println(loooongString)

    // Combining Strings example
    val fname = "Firstname"
    val lname = "Lastname"
    val fullname = fname + " " + lname
    println(space)
    println("Full name: $fullname. First name: $fname. Last name: $lname")

    // Type conversion examples
    println(space)
    println("Converting a double (99.2222) to int: " + (99.2222.toInt()))
    println("Converting a char ('A') to int: " + ('A'.toInt()))
    println("Converting an int ('65') to char: " + (65.toChar()))

    // array examples
    var myArray = arrayOf(1, 1.1, "one", '1') //notice different variable types

    println(space)

    // printing an array with a for loop
    // for loops can iterate through anything with an iterator
    for( item in myArray ) println(item)

    println(space)

    // using a for loop to print 1 through 50
    for (i in 1..50)
    {
        print("$i ")
    }

    println(space)

    // while/do-while loops are as usual
    var x = 25
    while(x > 0)
    {
        print("$x ")
        x--
    }
    x = 25
    do{
        println("\n$x")
    } while(x>10000)

    println(space)

    // Replacing SWITCH is the WHEN expression
    for(x in 0..6){
        when(x){
            1 -> println("x is 1")
            2 -> println("x is 2")
            in 3..5 -> println("x is either 3, 4 or 5")
            else -> println("x is not 1, 2, 3, 4 or 5")
        }
    }

    
}