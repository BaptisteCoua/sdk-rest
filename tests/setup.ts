import { vi } from 'vitest'

// Mock global de $fetch pour les tests unitaires
vi.stubGlobal('$fetch', vi.fn())
