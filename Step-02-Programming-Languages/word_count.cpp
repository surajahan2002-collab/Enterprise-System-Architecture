#include <iostream>
#include <fstream>
#include <string>

// Step 02: Polyglot Architecture
// Compiled Language (C++) Implementation

int main() {
    std::ifstream file("sample.txt");
    std::string word;
    int count = 0;

    if (file.is_open()) {
        // C++ requires explicit stream handling
        while (file >> word) {
            count++;
        }
        file.close();
        std::cout << "[C++ Compiled Execution] Total words counted: " << count << std::endl;
    } else {
        std::cout << "[ERROR] Unable to open the file." << std::endl;
    }

    return 0;
}
