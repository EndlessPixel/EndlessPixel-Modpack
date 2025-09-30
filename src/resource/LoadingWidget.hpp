#pragma once
#include <QWidget>
#include <QProgressBar>
#include <QLabel>
#include <QTimer>

class LoadingWidget : public QWidget {
    Q_OBJECT
public:
    explicit LoadingWidget(QWidget *parent = nullptr);

private:
    QLabel *m_title;
    QProgressBar *m_bar;
    QTimer *m_timer;
    int m_val = 0;

private slots:
    void onProgress();
    void paintEvent(QPaintEvent *) override;
};