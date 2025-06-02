import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { LoanService } from '../../../_services/loan.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnDestroy {
  @ViewChild('statusChart') statusChart!: ElementRef<HTMLDivElement>;
  @ViewChild('loanTypeChart') loanTypeChart!: ElementRef<HTMLDivElement>;
  @ViewChild('genderChart') genderChart!: ElementRef<HTMLDivElement>;
  @ViewChild('employmentChart') employmentChart!: ElementRef<HTMLDivElement>;
  @ViewChild('chartWrapper') chartWrapper!: ElementRef<HTMLDivElement>;

  loading = true;
  error: string | null = null;
  private refreshInterval: any;

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loadCharts();
    // Auto-refresh every 10 seconds
    this.refreshInterval = setInterval(() => {
      this.fetchDataAndDrawCharts();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  async loadCharts() {
    try {
      await this.loadGoogleChartsScript();
      this.fetchDataAndDrawCharts();
    } catch (err) {
      console.error('Failed to load charts:', err);
      this.error = 'Failed to load charts. Please try again later.';
      this.loading = false;
    }
  }

  loadGoogleChartsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google?.charts?.load) {
        (window as any).google.charts.load('current', {
          packages: ['corechart'],
        });
        (window as any).google.charts.setOnLoadCallback(() => resolve());
      } else if ((window as any).google?.charts) {
        resolve(); // Already loaded
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
          (window as any).google.charts.load('current', {
            packages: ['corechart'],
          });
          (window as any).google.charts.setOnLoadCallback(() => resolve());
        };
        script.onerror = () =>
          reject(new Error('Failed to load Google Charts'));
        document.head.appendChild(script);
      }
    });
  }

  fetchDataAndDrawCharts() {
    this.loanService.getAllLoans().subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          this.error = 'No data available for charts';
          return;
        }

        this.drawAllCharts(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching loan data:', err);
        this.error = 'Failed to load loan data';
        this.loading = false;
      },
    });
  }

  drawAllCharts(data: any[]) {
    try {
      const statusCounts = this.countByKey(data, 'status');
      const loanTypeCounts = this.countByKey(data, 'loanType');
      const genderCounts = this.countByKey(data, 'gender');
      const employmentCounts = this.countByKey(data, 'employmentType');

      this.drawPieChart(
        this.statusChart.nativeElement,
        statusCounts,
        'Loan Status'
      );
      this.drawPieChart(
        this.loanTypeChart.nativeElement,
        loanTypeCounts,
        'Loan Types'
      );
      this.drawPieChart(
        this.genderChart.nativeElement,
        genderCounts,
        'Gender Distribution'
      );
      this.drawPieChart(
        this.employmentChart.nativeElement,
        employmentCounts,
        'Employment Type'
      );
    } catch (err) {
      console.error('Error drawing charts:', err);
      this.error = 'Error rendering charts';
    }
  }

  countByKey(data: any[], key: string): Record<string, number> {
    return data.reduce((acc: Record<string, number>, item: any) => {
      const value = item[key] || 'Unknown';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  drawPieChart(
    element: HTMLElement,
    counts: Record<string, number>,
    title: string
  ) {
    if (!element) {
      console.error('Chart element not found for:', title);
      return;
    }

    const google = (window as any).google;
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      try {
        const dataArray: (string | number)[][] = [['Category', 'Count']];
        Object.entries(counts).forEach(([key, value]) => {
          dataArray.push([key, value]);
        });

        const data = google.visualization.arrayToDataTable(dataArray);
        const options = {
          title,
          pieHole: 0.4,
          legend: { position: 'right' },
          chartArea: { width: '80%', height: '80%' },
        };

        const chart = new google.visualization.PieChart(element);
        chart.draw(data, options);
      } catch (err) {
        console.error('Error drawing chart:', title, err);
      }
    });
  }
}
