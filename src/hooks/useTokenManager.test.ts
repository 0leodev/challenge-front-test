// import { describe, it, expect, vi, beforeEach } from "vitest"
// import { renderHook, act } from "@testing-library/react"
// import { useTokenManager } from "./useTokenManager"
// import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
// import { parseUnits, formatUnits } from "viem"

// // Mock wagmi hooks
// vi.mock("wagmi", () => ({
//   useAccount: vi.fn(),
//   useReadContract: vi.fn(),
//   useWriteContract: vi.fn(),
//   useWaitForTransactionReceipt: vi.fn(),
// }))

// // Mock viem functions
// vi.mock("viem", () => ({
//   parseUnits: vi.fn(),
//   formatUnits: vi.fn(),
// }))

// describe("useTokenManager", () => {
//   const mockToken = {
//     address: "0x1234567890123456789012345678901234567890",
//     decimals: 18,
//     symbol: "TEST",
//   }
//   const mockTargetAddress = "0x0987654321098765432109876543210987654321"
//   const mockAddress = "0x1111111111111111111111111111111111111111"

//   beforeEach(() => {
//     vi.resetAllMocks()

//     // Mock useAccount
//     vi.mocked(useAccount).mockReturnValue({ address: mockAddress })

//     // Mock useReadContract
//     vi.mocked(useReadContract).mockReturnValue({
//       data: BigInt(1000),
//       refetch: vi.fn(),
//     })

//     // Mock useWriteContract
//     vi.mocked(useWriteContract).mockReturnValue({
//       writeContractAsync: vi.fn().mockResolvedValue("0xmockhash"),
//     })

//     // Mock useWaitForTransactionReceipt
//     vi.mocked(useWaitForTransactionReceipt).mockReturnValue({
//       isLoading: false,
//     })

//     // Mock viem functions
//     vi.mocked(parseUnits).mockReturnValue(BigInt(1000))
//     vi.mocked(formatUnits).mockReturnValue("1000")
//   })

//   it("should initialize with correct default values", () => {
//     const { result } = renderHook(() => useTokenManager(mockToken, mockTargetAddress))

//     expect(result.current.balance).toBe("1000")
//     expect(result.current.approvedAmount).toBe("1000")
//     expect(result.current.amount).toBe("")
//     expect(result.current.error).toBeNull()
//   })

//   it("should update amount when setAmount is called", () => {
//     const { result } = renderHook(() => useTokenManager(mockToken, mockTargetAddress))

//     act(() => {
//       result.current.setAmount("50")
//     })

//     expect(result.current.amount).toBe("50")
//   })

//   it("should call writeContractAsync when handleApprove is called", async () => {
//     const { result } = renderHook(() => useTokenManager(mockToken, mockTargetAddress))

//     await act(async () => {
//       result.current.setAmount("50")
//       await result.current.handleApprove()
//     })

//     expect(vi.mocked(useWriteContract).mock.results[0].value.writeContractAsync).toHaveBeenCalledWith({
//       address: mockToken.address,
//       abi: expect.any(Array),
//       functionName: "approve",
//       args: [mockAddress, BigInt(1000)],
//     })
//   })

//   it("should call writeContractAsync when handleTransfer is called", async () => {
//     const { result } = renderHook(() => useTokenManager(mockToken, mockTargetAddress))

//     await act(async () => {
//       result.current.setAmount("50")
//       await result.current.handleTransfer()
//     })

//     expect(vi.mocked(useWriteContract).mock.results[0].value.writeContractAsync).toHaveBeenCalledWith({
//       address: mockToken.address,
//       abi: expect.any(Array),
//       functionName: "transferFrom",
//       args: [mockAddress, mockTargetAddress, BigInt(1000)],
//     })
//   })

//   it("should call writeContractAsync when handleMint is called", async () => {
//     const { result } = renderHook(() => useTokenManager(mockToken, mockTargetAddress))

//     await act(async () => {
//       await result.current.handleMint()
//     })

//     expect(vi.mocked(useWriteContract).mock.results[0].value.writeContractAsync).toHaveBeenCalledWith({
//       address: mockToken.address,
//       abi: expect.any(Array),
//       functionName: "mint",
//       args: [mockAddress, BigInt(1000)],
//     })
//   })

//   it("should set error when a transaction fails", async () => {
//     vi.mocked(useWriteContract).mockReturnValue({
//       writeContractAsync: vi.fn().mockRejectedValue(new Error("Transaction failed")),
//     })

//     const { result } = renderHook(() => useTokenManager(mockToken, mockTargetAddress))

//     await act(async () => {
//       result.current.setAmount("50")
//       await result.current.handleApprove()
//     })

//     expect(result.current.error).toBe("Approval failed. Please try again.")
//   })

//   it("should calculate hasInsufficientBalance correctly", () => {
//     const { result } = renderHook(() => useTokenManager(mockToken, mockTargetAddress))

//     act(() => {
//       result.current.setAmount("2000")
//     })

//     expect(result.current.hasInsufficientBalance).toBe(true)

//     act(() => {
//       result.current.setAmount("500")
//     })

//     expect(result.current.hasInsufficientBalance).toBe(false)
//   })

//   it("should calculate hasInsufficientAllowance correctly", () => {
//     const { result } = renderHook(() => useTokenManager(mockToken, mockTargetAddress))

//     act(() => {
//       result.current.setAmount("2000")
//     })

//     expect(result.current.hasInsufficientAllowance).toBe(true)

//     act(() => {
//       result.current.setAmount("500")
//     })

//     expect(result.current.hasInsufficientAllowance).toBe(false)
//   })
// })

