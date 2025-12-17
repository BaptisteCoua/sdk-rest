/**
 * Paramètres standards pour identifier une ressource.
 * Ex: /products/:id
 */
export interface ResourceIdentifier {
  id: string | number
}

/**
 * Paramètres de recherche standards (extensible plus tard).
 */
export interface ResourceSearchQuery {
  page?: number
  limit?: number
  query?: Record<string, string | number | boolean>
}

/**
 * Définition générique d’une ressource REST.
 * Toutes les ressources exposent automatiquement ces opérations.
 */
export interface ResourceDefinition<T> {
  /**
   * Récupère le détail d’un élément.
   * GET /resource/:id
   */
  details(params: ResourceIdentifier): Promise<T>

  /**
   * Recherche / liste des éléments.
   * GET /resource
   */
  search(params?: ResourceSearchQuery): Promise<T[]>

  /**
   * Crée un nouvel élément.
   * POST /resource
   */
  create(payload: Partial<T>): Promise<T>

  /**
   * Met à jour un élément existant.
   * PUT /resource/:id
   */
  update(params: ResourceIdentifier, payload: Partial<T>): Promise<T>

  /**
   * Supprime un élément.
   * DELETE /resource/:id
   */
  delete(params: ResourceIdentifier): Promise<void>
}
