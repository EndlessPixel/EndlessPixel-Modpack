#include <QApplication>
#include "LoadingWidget.hpp"

int main(int argc, char *argv[]) {
    QApplication a(argc, argv);
    LoadingWidget w;
    w.show();
    return a.exec();
}