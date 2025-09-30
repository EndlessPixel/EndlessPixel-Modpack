cmake_minimum_required(VERSION 3.24)
project(LoadingTest LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 REQUIRED COMPONENTS Widgets)
qt6_standard_project_setup()

add_executable(LoadingTest
    main.cpp
    LoadingWidget.cpp
    LoadingWidget.hpp
)
target_link_libraries(LoadingTest PRIVATE Qt6::Widgets)