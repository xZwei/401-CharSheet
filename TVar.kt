fun main(args : Array<String>){
    // Notice that no type is specified, this is due to
    // Kotlin being able to infer typing if desired
    var myNum = 1;          //mutable
    val myConstantNum = 1;  //immutable, can't change

    // ---------DATA-TYPES---------
    // region

    //number stuff
    var myInt: Int = Int.MAX_VALUE              //32 bits
    var myDouble: Double = Double.MAX_VALUE     //64 bits
    var myFloat: Float = Float.MAX_VALUE        //32 bits
    var myLong: Long = Long.MAX_VALUE           //64 bits
    var myShort: Short = Short.MAX_VALUE        //16 bits
    var myByte: Byte = Byte.MAX_VALUE           //8 bits

    //strings and letters and stuff
    var myChar: Char = 'A'
    var myString: String = "issa string"
    var myStriiiiiiing: String = """
        Look
        at this
        multi-line
        String
        ... and trimIndent() removes the indent for me!
    """.trimIndent()
    var myStriiiiiiingWithIndent: String = """
        Look
        at this
        multi-line
        String
        ... but this time with the indent!
    """

    //boolean stuff
    var myBoolean: Boolean

    //array stuff
    var myArray = arrayOf(1, 1.1, '1', "one")       //notice it can contain different data types
    var myIntArray: IntArray = intArrayOf(1, 2, 3)  //or we can make an array of a single type

    // endregion

    // Some type casting stuff
    println("Changing myDouble, $myDouble, to an int is easy: ${myDouble.toInt()}")
    println("Changing myChar, $myChar, to a double is also easy ${myChar.toDouble()}")
    println(myStriiiiiiing)
    println(myStriiiiiiingWithIndent)
}