#include <iostream>
#include <cstdlib>
int main() {
    #ifdef _WIN32
        std::cout << "Detected Windows OS" << std::endl;
}
    #elif defined(__linux__)
        std::cout << "Detected Linux OS" << std::endl;
    #elif defined(__APPLE__)
        std::cout << "Detected macOS" << std::endl;
    #else
        std::cerr << "Unknown OS" << std::endl;
    #endif
    return 0;
}
