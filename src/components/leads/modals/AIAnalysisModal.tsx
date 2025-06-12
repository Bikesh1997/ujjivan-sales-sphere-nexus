
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

interface AnalysisReport {
  sentiment: string;
  customerConcerns: string;
  decisionDrivers: string;
  conversionLikelihood: string;
  conversionDetails: string;
  riskTolerance: string;
  riskToleranceDetails: string;
  investmentReadiness: string;
  investmentReadinessDetails: string;
}

interface AIAnalysisModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  analysisReport: AnalysisReport;
}

const AIAnalysisModal = ({ isOpen, onOpenChange, analysisReport }: AIAnalysisModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Bot size={20} className="text-blue-600" />
            AI Call Analysis
          </DialogTitle>
          <p className="text-sm text-gray-600">Analysis complete</p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-medium mb-3 text-sm sm:text-base">Call Analysis Report</h3>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <strong>Customer Sentiment:</strong> {analysisReport.sentiment}
                <br />
                {analysisReport.customerConcerns}
              </div>

              <div>
                <strong>Decision Drivers:</strong> {analysisReport.decisionDrivers}
              </div>

              <div>
                <strong>Conversion Likelihood:</strong> {analysisReport.conversionLikelihood}
                <br />
                {analysisReport.conversionDetails}
              </div>

              <div>
                <strong>Risk Tolerance:</strong> {analysisReport.riskTolerance}
                <br />
                {analysisReport.riskToleranceDetails}
              </div>

              <div>
                <strong>Investment Readiness:</strong> {analysisReport.investmentReadiness}
                <br />
                {analysisReport.investmentReadinessDetails}
              </div>
            </div>
          </div>

          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full text-sm"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAnalysisModal;
