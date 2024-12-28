# Project name: Library Management System
# The user can perform 5 different operations to the Library Management System such as adding books,
# returning books, view available books, borrowing books, and exiting the program

class Books:
    # This function creates a new book that stores author, title, and availability
    def __init__(self, author, title):
        self.author = author
        self.title = title
        self.available = True

    # This function allows the user to borrow a book and check if it is available or not
    def borrow(self):
        if self.available:
            self.available = False
            return True
        return False

    # This function lets the user return a book back to the system and set its book to being available
    def return_book(self):
         self.available = True


class Library:
    # This function creates an empty library with no books
    def __init__(self):
        self.book = []

    # This function allows the user to add books into the library system
    def add_book(self, author, title):
        new_book = Books(author, title)
        self.book.append(new_book)
        print("Book " + title + " by " + author + " was successfully added!")

    # This function allows the user to view available books
    def view_available_books(self):
        print("Available Books: ")
        check = False
        for book in self.book:
            if book.available:
                check = True
                print(book.title + " by " + book.author + " is available!")
        if not check:
            print("No books are currently available.")

    # This function finds a book by its title
    def find_book(self, title):
        for book in self.book:
            if book.title.lower() == title.lower():
                return book
        return None


def main():
    # Create an instance of the Library class
    lib = Library()
    print("Welcome to the Library Management System!")
    print("1. Add Book")
    print("2. View Available Books")
    print("3. Borrow Book")
    print("4. Return Book")
    print("5. Exit")

    while True:
        # Get user's choice
        num = int(input("Enter your choice: "))

        if num == 1:
            title_book = input("Enter the title of the book: ").strip()
            author_book = input("Enter the author of the book: ").strip()
            # Allows user to adds book to library through library instance
            lib.add_book(author_book, title_book)

        elif num == 2:
            # Allows user to use library instance to view available books
            lib.view_available_books()

        elif num == 3:
            # Asks user for title of book
            title_book = input("Enter the title of the book: ").strip()
            # Set new variable 'check' which checks if book exists in library instance
            check = lib.find_book(title_book)
            if check and check.borrow():
                print("You have successfully borrowed " + title_book)
            else:
                print("This book is not available or does not exist.")

        elif num == 4:
            # Asks user for title of book
            title_book = input("Enter the title of the book: ").strip()
            # Set new variable 'check' which checks if book exists in library instance
            check = lib.find_book(title_book)
            if check:
                # Return the book using the method from the Books class
                check.return_book()
                print("You have successfully returned " + title_book + "!")
            else:
                print("This book does not exist in the library.")

        elif num == 5:
            # Allows user to stop the operation
            print("Exiting the Library Management System. Goodbye!")
            break

        else:
            # only used when input is not an integer between 1 and 5
            print("Invalid input, Please try again!")  # Handle invalid input

main()

