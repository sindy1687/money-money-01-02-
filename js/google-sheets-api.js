// Google Sheets API 整合服務
class GoogleSheetsService {
    constructor() {
        this.apiKey = null;
        this.clientId = null;
        this.spreadsheetId = null;
        this.isInitialized = false;
        this.accessToken = null;
        this.oauthToken = null;
    }

    // 初始化 Google Sheets API
    async initialize(config = {}) {
        try {
            this.apiKey = config.apiKey || localStorage.getItem('google_api_key') || '';
            this.clientId = config.clientId || localStorage.getItem('google_client_id') || '';
            this.spreadsheetId = config.spreadsheetId || localStorage.getItem('google_spreadsheet_id') || '';
            
            if (!this.apiKey) {
                throw new Error('Google API Key 未設置');
            }

            // 載入 Google API 客戶端庫
            await this.loadGoogleAPI();
            
            this.isInitialized = true;
            console.log('✅ Google Sheets API 初始化成功');
            return true;
        } catch (error) {
            console.error('❌ Google Sheets API 初始化失敗:', error);
            return false;
        }
    }

    // 載入 Google API 客戶端庫
    loadGoogleAPI() {
        return new Promise((resolve, reject) => {
            if (window.gapi) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = () => {
                gapi.load('client', () => {
                    gapi.client.init({
                        apiKey: this.apiKey,
                        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
                    }).then(resolve).catch(reject);
                });
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // 設置 API 配置
    setConfig(config) {
        if (config.apiKey) {
            this.apiKey = config.apiKey;
            localStorage.setItem('google_api_key', config.apiKey);
        }
        if (config.clientId) {
            this.clientId = config.clientId;
            localStorage.setItem('google_client_id', config.clientId);
        }
        if (config.spreadsheetId) {
            this.spreadsheetId = config.spreadsheetId;
            localStorage.setItem('google_spreadsheet_id', config.spreadsheetId);
        }
    }

    // 創建新的試算表
    async createSpreadsheet(title) {
        try {
            if (!this.isInitialized) {
                await this.initialize();
            }

            const response = await gapi.client.sheets.spreadsheets.create({
                properties: {
                    title: title,
                    locale: 'zh_TW'
                },
                sheets: [
                    {
                        properties: {
                            title: '記錄',
                            gridProperties: {
                                rowCount: 1000,
                                columnCount: 20
                            }
                        }
                    },
                    {
                        properties: {
                            title: '分類',
                            gridProperties: {
                                rowCount: 100,
                                columnCount = 10
                            }
                        }
                    },
                    {
                        properties: {
                            title: '帳戶',
                            gridProperties: {
                                rowCount: 50,
                                columnCount: 10
                            }
                        }
                    },
                    {
                        properties: {
                            title: '設定',
                            gridProperties: {
                                rowCount: 20,
                                columnCount: 5
                            }
                        }
                    }
                ]
            });

            this.spreadsheetId = response.result.spreadsheetId;
            localStorage.setItem('google_spreadsheet_id', this.spreadsheetId);
            
            console.log('✅ 試算表創建成功:', this.spreadsheetId);
            return response.result;
        } catch (error) {
            console.error('❌ 創建試算表失敗:', error);
            throw error;
        }
    }

    // 獲取試算表信息
    async getSpreadsheetInfo() {
        try {
            if (!this.spreadsheetId) {
                throw new Error('試算表 ID 未設置');
            }

            const response = await gapi.client.sheets.spreadsheets.get({
                spreadsheetId: this.spreadsheetId
            });

            return response.result;
        } catch (error) {
            console.error('❌ 獲取試算表信息失敗:', error);
            throw error;
        }
    }

    // 讀取工作表數據
    async readSheet(sheetName, range = 'A1:Z1000') {
        try {
            if (!this.spreadsheetId) {
                throw new Error('試算表 ID 未設置');
            }

            const response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `${sheetName}!${range}`
            });

            return response.result;
        } catch (error) {
            console.error(`❌ 讀取工作表 ${sheetName} 失敗:`, error);
            throw error;
        }
    }

    // 寫入工作表數據
    async writeSheet(sheetName, range, values) {
        try {
            if (!this.spreadsheetId) {
                throw new Error('試算表 ID 未設置');
            }

            const response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: `${sheetName}!${range}`,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: values
                }
            });

            return response.result;
        } catch (error) {
            console.error(`❌ 寫入工作表 ${sheetName} 失敗:`, error);
            throw error;
        }
    }

    // 追加數據到工作表
    async appendSheet(sheetName, values) {
        try {
            if (!this.spreadsheetId) {
                throw new Error('試算表 ID 未設置');
            }

            const response = await gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: this.spreadsheetId,
                range: `${sheetName}!A:Z`,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: values
                }
            });

            return response.result;
        } catch (error) {
            console.error(`❌ 追加數據到工作表 ${sheetName} 失敗:`, error);
            throw error;
        }
    }

    // 清空工作表
    async clearSheet(sheetName, range = 'A1:Z1000') {
        try {
            if (!this.spreadsheetId) {
                throw new Error('試算表 ID 未設置');
            }

            const response = await gapi.client.sheets.spreadsheets.values.clear({
                spreadsheetId: this.spreadsheetId,
                range: `${sheetName}!${range}`
            });

            return response.result;
        } catch (error) {
            console.error(`❌ 清空工作表 ${sheetName} 失敗:`, error);
            throw error;
        }
    }

    // 批量操作
    async batchUpdate(requests) {
        try {
            if (!this.spreadsheetId) {
                throw new Error('試算表 ID 未設置');
            }

            const response = await gapi.client.sheets.spreadsheets.batchUpdate({
                spreadsheetId: this.spreadsheetId,
                resource: {
                    requests: requests
                }
            });

            return response.result;
        } catch (error) {
            console.error('❌ 批量更新失敗:', error);
            throw error;
        }
    }

    // 獲取當前配置
    getConfig() {
        return {
            apiKey: this.apiKey,
            clientId: this.clientId,
            spreadsheetId: this.spreadsheetId,
            isInitialized: this.isInitialized
        };
    }

    // 檢查連接狀態
    async checkConnection() {
        try {
            if (!this.spreadsheetId) {
                return { connected: false, error: '試算表 ID 未設置' };
            }

            await this.getSpreadsheetInfo();
            return { connected: true };
        } catch (error) {
            return { connected: false, error: error.message };
        }
    }
}

// 創建全局實例
window.googleSheetsService = new GoogleSheetsService();

console.log('🔧 Google Sheets API 服務已載入');
