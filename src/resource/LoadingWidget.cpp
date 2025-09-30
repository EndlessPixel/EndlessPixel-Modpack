#include "LoadingWidget.hpp"
#include <QVBoxLayout>
#include <QPushButton>
#include <QMessageBox>
#include <QPainter>

LoadingWidget::LoadingWidget(QWidget *parent)
    : QWidget(parent) {

    setFixedSize(400, 250);
    setWindowFlags(Qt::FramelessWindowHint);
    setAttribute(Qt::WA_TranslucentBackground);

    QVBoxLayout *mainLay = new QVBoxLayout(this);
    mainLay->setContentsMargins(0, 0, 0, 0);

    QPushButton *closeBtn = new QPushButton("×", this);
    closeBtn->setFixedSize(30, 30);
    closeBtn->setStyleSheet("border:none;font:18px;color:#fff;");
    connect(closeBtn, &QPushButton::clicked, qApp, &QCoreApplication::quit);
    mainLay->addWidget(closeBtn, 0, Qt::AlignRight);

    m_title = new QLabel("EndlessPixel App", this);
    m_title->setAlignment(Qt::AlignCenter);
    m_title->setStyleSheet("color:#fff;font:24px;");
    mainLay->addStretch();
    mainLay->addWidget(m_title);

    m_bar = new QProgressBar(this);
    m_bar->setRange(0, 100);
    m_bar->setTextVisible(false);
    m_bar->setFixedHeight(6);
    m_bar->setStyleSheet(
        "QProgressBar{background:#444;border-radius:3px;}"
        "QProgressBar::chunk{background:#00ff88;border-radius:3px;}");
    mainLay->addWidget(m_bar);
    mainLay->addStretch();

    m_timer = new QTimer(this);
    connect(m_timer, &QTimer::timeout, this, &LoadingWidget::onProgress);
    m_timer->start(30);
}

void LoadingWidget::onProgress() {
    m_val++;
    m_bar->setValue(m_val);
    if (m_val >= 100) {
        m_timer->stop();
        QMessageBox::information(this, "start main", "Loading complete!");
        qApp->quit();
    }
}

void LoadingWidget::paintEvent(QPaintEvent *) {
    QPainter p(this);
    p.setRenderHint(QPainter::Antialiasing);
    p.setBrush(QColor(30, 30, 30, 240));
    p.setPen(Qt::NoPen);
    p.drawRoundedRect(rect(), 12, 12);
}