import kotlin.reflect.full.memberProperties

//example of data class declaration
data class Result(val one: Int, val two: Int, val three: Int)

fun main(args : Array<String>) {
    //Here is a standard function declaration with the parameter i having a default value of 10
    fun printToConsole(firstToPrint: Int = 10): Int {
        return firstToPrint    }

    //here the type Pair is a built-in data class that allows me to return 2 Int values (there is also Triple)
    fun printToConsole(firstToPrint: Int, secondToPrint: Int): Pair<Int, Int>{
        return Pair(firstToPrint, secondToPrint)
    }
    //here the type Result is our data class from above that allows me to return 3 Int values
    fun printToConsole(firstToPrint: Int = 1, secondToPrint: Int = 2, thirdToPrint: Int = 3): Result{
        return Result(firstToPrint, secondToPrint, thirdToPrint)
    }

    //example of the method as normal
    println("Normal function: ${printToConsole(1)}")

    //example of default value being used
    println("Default value of 10 is used since none is given: ${printToConsole()}")

    //example of a basic override
    println("Override: ${printToConsole(1,2)}")

    //named arguments can be used for code readability like so:
    println("Override with named arguments: ${printToConsole(firstToPrint = 1, secondToPrint = 2)}")

    //more examples
    println("Override: ${printToConsole(firstToPrint = 1, secondToPrint = 2, thirdToPrint = 3)}")
    println()
    printToConsole(6,7,8)

    //another example


    //we can also use data classes like this:
    val dataClassExample = printToConsole(5,4,3)
    println("If I just print the object: $dataClassExample")
    println("If I want to print a single value from the object: ${dataClassExample.one}")
    println("If I want to print a single value from the object: ${dataClassExample.two}")
    println("If I want to print a single value from the object: ${dataClassExample.three}")

    //Printing all three with a single line! (not to say that you can't make it multiple lines if you want for readability)
    for(prop in Result::class.memberProperties) println("${prop.name} = ${prop.get(dataClassExample)}")
}