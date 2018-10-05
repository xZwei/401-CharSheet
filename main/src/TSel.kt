//Notice I can import a JAVA library
import java.util.Random

fun main(args : Array<String>){

    //extension function for Random that lets us give it a range for our random number
    fun IntRange.random() = Random().nextInt((endInclusive + 1) - start) +  start

    //variables
    val output1 = "Hello, World!"
    val output2 = "Hello, Class!"
    val inClass: Boolean = true
    var x: Int = (0..10).random() //here is where we use the extension function

    //single line if...
    if(!inClass) println(output1)

    //blocked if-else...
    if(inClass){
        println(output2)
    } else{
        println(output1)
    }

    //nested if...
    if(x > 5){
        if(inClass){
            println("x is greater than 5")
        } else{
            println("I don't care what x is")
        }
    } else if(x == 2){
        println("x is 2")
    } else {
        println("x is not greater than 5 and it is not 2")
    }

    //When expression, replaces the switch statement
    when(x){
        1 -> println("x is 1")
        2 -> println("x is 2")
        in 6..10 -> println("x is greater than 5")
        else -> println("x is not 1, 2, 6, 7, 8, 9 or 10")
    }
}