import React, { useState } from 'react';
import { Upload, FileText, MessageSquare, User, LogIn, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { toast } = useToast();

  // Mock login function
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    setUser({ email, name: email.split('@')[0] });
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
  };

  // Mock signup function - now redirects to login
  const handleSignup = (email: string, password: string, name: string) => {
    console.log('Signup attempt:', { email, password, name });
    toast({
      title: "Account created successfully!",
      description: `Welcome ${name}! Please log in to continue.`,
    });
    setActiveTab('login');
  };

  // Mock PDF upload function
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    console.log('Uploading file:', file.name);

    // Simulate upload delay
    setTimeout(() => {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        uploadDate: new Date().toLocaleDateString(),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        questions: []
      };

      setDocuments(prev => [newDocument, ...prev]);
      setIsUploading(false);
      toast({
        title: "Document uploaded successfully!",
        description: `${file.name} has been processed and is ready for queries.`,
      });
    }, 2000);
  };

  // Mock question submission
  const handleQuestionSubmit = async () => {
    if (!currentQuestion.trim() || !selectedDocument) return;

    setIsProcessing(true);
    console.log('Processing question:', currentQuestion);

    // Simulate AI processing delay
    setTimeout(() => {
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: currentQuestion,
        answer: `Based on the analysis of "${selectedDocument.name}", here's a comprehensive response to your question. This AI-generated answer demonstrates the document processing capabilities using advanced natural language processing technologies like LangChain and LlamaIndex.`,
        timestamp: new Date().toLocaleTimeString()
      };

      setDocuments(prev => prev.map(doc => 
        doc.id === selectedDocument.id 
          ? { ...doc, questions: [newQuestion, ...doc.questions] }
          : doc
      ));

      setSelectedDocument(prev => prev ? {
        ...prev,
        questions: [newQuestion, ...prev.questions]
      } : null);

      setCurrentQuestion('');
      setIsProcessing(false);
      toast({
        title: "Answer generated!",
        description: "Your question has been processed successfully.",
      });
    }, 3000);
  };

  const logout = () => {
    setUser(null);
    setDocuments([]);
    setSelectedDocument(null);
    setMobileMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-white mb-2">PDF Query Explorer</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Upload documents and get intelligent answers to your questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 p-1">
                      <TabsTrigger value="login" className="data-[state=active]:bg-white/20 text-white">Login</TabsTrigger>
                      <TabsTrigger value="signup" className="data-[state=active]:bg-white/20 text-white">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login">
                      <LoginForm onLogin={handleLogin} />
                    </TabsContent>
                    
                    <TabsContent value="signup">
                      <SignupForm onSignup={handleSignup} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Modern Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">PDF Query Explorer</h1>
                <p className="text-xs text-gray-300 hidden sm:block">Intelligent document analysis</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-gray-300">
                <span className="text-sm">Welcome back,</span>
                <span className="ml-2 font-semibold text-white">{user.name}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={logout} 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
              >
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                <div className="text-gray-300">
                  <span className="text-sm">Welcome back,</span>
                  <span className="ml-2 font-semibold text-white">{user.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={logout} 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Document Upload & List - Responsive Layout */}
          <div className="xl:col-span-1 space-y-6">
            {/* Upload Card */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center text-lg">
                  <Upload className="mr-3 h-5 w-5 text-indigo-400" />
                  Upload Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-indigo-400/50 transition-all duration-200 bg-white/5 hover:bg-white/10">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-indigo-400" />
                        <p className="text-sm text-gray-300 text-center">
                          <span className="font-semibold">Click to upload</span><br />
                          <span className="text-xs">PDF files only</span>
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                  {isUploading && (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-400"></div>
                      <span className="ml-3 text-white text-sm">Processing document...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg">Your Documents</CardTitle>
                <CardDescription className="text-gray-400">
                  {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {documents.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">No documents uploaded yet</p>
                    </div>
                  ) : (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedDocument?.id === doc.id
                            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-400/50 shadow-lg'
                            : 'bg-white/5 hover:bg-white/10 border border-transparent'
                        }`}
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-sm truncate mb-1">
                              {doc.name}
                            </h3>
                            <p className="text-gray-400 text-xs">
                              {doc.uploadDate} • {doc.size}
                            </p>
                          </div>
                          {doc.questions.length > 0 && (
                            <Badge variant="secondary" className="ml-2 bg-indigo-500/20 text-indigo-200 border-indigo-400/30">
                              {doc.questions.length} Q&A
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Viewer & Q&A - Responsive Layout */}
          <div className="xl:col-span-3">
            {selectedDocument ? (
              <div className="space-y-6">
                {/* PDF Viewer */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white text-lg truncate">{selectedDocument.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      Document viewer and analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 text-center border-2 border-dashed border-white/20 min-h-[300px] flex items-center justify-center">
                      <div>
                        <FileText className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                        <p className="text-white text-lg font-medium mb-2">PDF Viewer</p>
                        <p className="text-gray-400 text-sm">Document content would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Question Input */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white flex items-center text-lg">
                      <MessageSquare className="mr-3 h-5 w-5 text-indigo-400" />
                      Ask a Question
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Get intelligent answers about your document
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="What would you like to know about this document?"
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px] resize-none focus:border-indigo-400/50"
                        rows={4}
                      />
                      <Button
                        onClick={handleQuestionSubmit}
                        disabled={!currentQuestion.trim() || isProcessing}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 transition-all duration-200"
                      >
                        {isProcessing ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Processing your question...
                          </div>
                        ) : (
                          'Generate Answer'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Q&A History */}
                {selectedDocument.questions.length > 0 && (
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-white text-lg">Questions & Answers</CardTitle>
                      <CardDescription className="text-gray-400">
                        Conversation history with your document
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6 max-h-96 overflow-y-auto">
                        {selectedDocument.questions.map((qa) => (
                          <div key={qa.id} className="border-l-4 border-indigo-500 pl-6 py-2">
                            <div className="mb-3">
                              <p className="text-white font-medium mb-1">{qa.question}</p>
                              <p className="text-gray-400 text-xs">{qa.timestamp}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                              <p className="text-gray-300 text-sm leading-relaxed">{qa.answer}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-xl min-h-[500px] flex items-center justify-center">
                <div className="text-center py-12">
                  <FileText className="h-20 w-20 text-gray-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-3">Select a Document</h3>
                  <p className="text-gray-400 text-lg max-w-md mx-auto">
                    Choose a document from your library to start asking questions and get intelligent answers
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onLogin }: { onLogin: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email" className="text-white text-sm font-medium">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400/50"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-white text-sm font-medium">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400/50"
          placeholder="Enter your password"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 transition-all duration-200"
      >
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </form>
  );
};

// Signup Form Component
const SignupForm = ({ onSignup }: { onSignup: (email: string, password: string, name: string) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-white text-sm font-medium">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400/50"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-email" className="text-white text-sm font-medium">Email Address</Label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400/50"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-password" className="text-white text-sm font-medium">Password</Label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-indigo-400/50"
          placeholder="Create a password"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 transition-all duration-200"
      >
        <User className="mr-2 h-4 w-4" />
        Create Account
      </Button>
    </form>
  );
};

export default Index;
